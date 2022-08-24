import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const emailService = {
  query,
  getById,
  remove,
  getNextEmailId,
  getLoggedInUser
}

const KEY = 'emailsDB'
const gEmails = _createEmails(20)
const gLoggedInUser = {
  email: 'user@appsus.com',
  fullName: 'Mahatma Appsus'
}

function getLoggedInUser() {
  return Promise.resolve(gLoggedInUser)
}

function query(filterBy) {
  let emails = _loadFromStorage()
  if (!emails) {
    emails = gEmails
    _saveToStorage(emails)
  }

  if (filterBy) {
    let { folder, search } = filterBy

    if (search) {
      emails = emails.filter(email => (
        email.body.includes(search) ||
        email.to.includes(search) ||
        email.subject.includes(search)
      ))
    } else {
      switch (folder) {
        case 'inbox':
          emails = emails.filter(email => email.to === 'user@appsus.com')
          break;

        case 'sent':
          emails = emails.filter(email => email.to !== 'user@appsus.com')
          break;

        case 'starred':
          emails = emails.filter(email => email.status === 'starred')
          break;

        case 'drafts':
          emails = emails.filter(email => email.status === 'drafts')
          break;

        case 'trash':
          emails = emails.filter(email => email.status === 'trash')
          break;
      }
    }
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
  let nextEmailIdx = (emailIdx === emails.length - 1) ? 0 : emailIdx + 1
  return emails[nextEmailIdx].id
}

function getById(emailId) {
  if (!emailId) return Promise.resolve(null)
  const emails = _loadFromStorage()
  const email = emails.find(email => email.id === emailId)
  return Promise.resolve(email)
}

function _createEmails(num) {
  const emails = []
  for (let i = 0; i < num; i++) {
    const email = _createEmail()
    emails.unshift(email)
  }
  return emails
}

function _createEmail() {
  return {
    id: utilService.makeId(),
    subject: utilService.makeLorem(3),
    body: utilService.makeLorem(10),
    isRead: false,
    status: null,
    sentAt: 1551133930594,
    to: utilService.getRandomIntInclusive(0, 1) ? 'momo@momo.com' : 'user@appsus.com',
    from: 'google@gmail.com'  
  }
}

function _loadFromStorage() {
  return storageService.loadFromStorage(KEY)
}

function _saveToStorage(emails) {
  storageService.saveToStorage(KEY, emails)
}