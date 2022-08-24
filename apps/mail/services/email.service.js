import { storageService } from "./storage.service.js"
import { utilService } from "./util.service.js"

export const emailService = {
  query,
  getById,
  remove,
  createReview,
  removeReview,
  addGoogleBook,
  getGoogleemails,
  getNextBookId
}

const KEY = 'emailsDB'
// const gemails

function query(filterBy) {
  let emails = _loadFromStorage()
  if (!emails) {
    emails = gEmails
    _saveToStorage(emails)
  }

  if (filterBy) {
    let { name, minPrice, maxPrice } = filterBy
    emails = emails.filter(book => (
      book.listPrice.amount >= minPrice &&
      book.listPrice.amount <= maxPrice &&
      book.title.includes(name)
    ))
  }

  return Promise.resolve(emails)
}

function remove(emailId) {
  let emails = _loadFromStorage()
  emails = emails.filter(email => email.id !== emailId)
  _saveToStorage(emails)
  return Promise.resolve()
}

function getNextEmailId(emailId) {
  let emails = _loadFromStorage()
  const emailIdx = emails.findIndex(email => email.id === emailId)
  let nextEmailIdx = (emailIdx === emails.length -1) ? 0 : emailIdx + 1
  return emails[nextEmailIdx].id
}

function getById(emailId) {
  if (!emailId) return Promise.resolve(null)
  const emails = _loadFromStorage()
  const email = emails.find(email => email.id === emailId)
  return Promise.resolve(email)
}

function _loadFromStorage() {
  return storageService.loadFromStorage(KEY)
}

function _saveToStorage(emails) {
  storageService.saveToStorage(KEY, emails)
}