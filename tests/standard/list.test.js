var List = require('../../lib/standard/list')
var Github = require('../../lib/util/github')
var Json = require('../../lib/util/json')
var Validate = require('../../lib/util/validate')
var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

describe('Standard List', () => {
  var input = {
    argv: { remain: [], cooked: [], original: [] },
    chapter: 'zagreb',
    branch: 'gh-pages'
  }
  var chapter = {
    name: 'NodeSchool Zagreb',
    location: {
      name: 'Zagreb',
      country: 'HR',
      lat: 22,
      lng: 33
    },
    twitter: '#nodeschool-zagreb'
  }
  sinon.stub(Github, 'all', function () {
    return new Promise(function (resolve) {
      resolve([chapter])
    })
  })
  sinon.stub(Json, 'fromUrl', function () {
    return new Promise(function (resolve) {
      resolve(chapter)
    })
  })
  sinon.stub(Validate, 'chapter', function () {
    return new Promise(function (resolve) {
      resolve(true)
    })
  })

  it('should get all the repos with new structure', (done) => {
    return List.getAllRepos(input).then(chapters => {
      var chapter = chapters['NodeSchool Zagreb']
      expect(chapter).to.exist
      expect(chapter.twitter).to.equal('#nodeschool-zagreb')
      done()
    })
  })
})