/**
 * Fetches an OPDS file from Standard Ebooks and converts the resulting XML into
 * a custom data structure for use in the application. This is our internal
 * "api" for the various components.
 * @module BooksService
 */

/**
 * @typedef   {Object}         Book
 * @property  {string}         id Unique URL of each book
 * @property  {string}         title
 * @property  {array|string}   authors
 * @property  {string}         language
 * @property  {string}         publisher
 * @property  {array|string}   source
 * @property  {string}         summary
 * @property  {string}         content
 * @property  {array|string}   categories
 * @property  {string}         cover
 * @property  {string}         thumbnail
 * @property  {string}         epub
 */

/**
 * @typedef   {Object}  Author
 * @property  {string}  name
 * @property  {string}  url
 */

import axios from 'axios'
const BASE_URL = 'https://standardebooks.org'
const OPDS_PATH = '/opds/all'

export default {

  /**
   * get the books in the OPDS Feed
   * @returns {promise} HTTP request to the Standard Ebooks OPDS feed. If
   * successful this resolves to an array of Book objects.
   */
  get () {
    return axios.get(BASE_URL + OPDS_PATH).then(response => {
      let parser = new DOMParser()
      let feed = parser.parseFromString(response.data, 'application/xml')
      let books = Array.from(feed.querySelectorAll('entry'))

      return books.map(b => this.generateBookData(b))
    })
  },

  /**
   * Generates a Book object from an OPDS entry element.
   * @param {node} bookXML
   * @returns {book} book object
   */
  generateBookData (bookXML) {
    /**
     * Parses an XML author tag and returns an author object
     * @param {node} authorXML
     * @returns {author} author object
     */
    function authorData (authorElement) {
      return {
        name: authorElement.querySelector('name').innerHTML,
        url : authorElement.querySelector('uri').innerHTML
      }
    }

    /**
     * Parses an XML source tag and returns a string of its content
     * @param {node} sourceElement
     * @returns {string} source string
     */
    function sourceData (sourceElement) {
      return sourceElement.innerHTML
    }

    /**
     * Parses an XML category tag and returns a string of its "term" attr value
     * @param {node} categoryElement
     * @returns {string} category term
     */
    function categoryData (categoryElement) {
      return categoryElement.attributes.getNamedItem('term').value
    }

    /**
     * Parses an XML entry node and finds the link element whose href ends in
     * "cover.jpg"
     * @param {node} bookXML
     * @returns {string} cover URL
     */
    function coverURL (doc) {
      let coverLink = doc.querySelector('link[href$="cover.jpg"]')
      return BASE_URL + coverLink.getAttribute('href')
    }

    /**
     * Parses an XML entry node and finds the link element whose rel is defined
     * as a thumbnail
     * @param {node} bookXML
     * @returns {string} cover thumbnail url
     */
    function thumbnailURL (doc) {
      let thumbnailLink = doc.querySelector('link[rel="http://opds-spec.org/image/thumbnail"]')
      return BASE_URL + thumbnailLink.getAttribute('href')
    }

    /**
     * Parses an XML entry node and finds the link element whose rel is defined
     * as an epub (and with href ending in '.epub' to avoid getting the EPUB3 version)
     * @param {node} bookXML
     * @returns {string} epub url
     */
    function epubURL (doc) {
      let thumbnailLink = doc.querySelector('link[type="application/epub+zip"][href$="epub"]')
      return BASE_URL + thumbnailLink.getAttribute('href')
    }

    // Alias DOM query methods for clarity
    let q = bookXML.querySelector.bind(bookXML)
    let qA = bookXML.querySelectorAll.bind(bookXML)

    return {
      id        : q('id').innerHTML,
      title     : q('title').innerHTML,
      authors   : Array.from(qA('author')).map(a => authorData(a)),
      language  : q('language').innerHTML,
      publisher : q('publisher').innerHTML,
      source    : Array.from(qA('source')).map(s => sourceData(s)),
      summary   : q('summary').textContent.trim(),
      content   : q('content').textContent.trim(),
      categories: Array.from(qA('category')).map(c => categoryData(c)),
      cover     : coverURL(bookXML),
      thumbnail : thumbnailURL(bookXML),
      epub      : epubURL(bookXML)
    }
  }
}
