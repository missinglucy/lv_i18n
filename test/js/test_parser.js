'use strict';


const assert = require('assert');


const parse = require('../../lib/parser');


describe('Parser', function () {

  it('Should find singulars', function () {
    assert.deepEqual(
      parse(`
        const char* my_text = _("My text");
        int i;
        const char* my_text2 =  _("My text2");
      `),
      [
        {
          key: 'My text',
          line: 2,
          plural: false
        },
        {
          key: 'My text2',
          line: 4,
          plural: false
        }
      ]
    );
  });

  it('Should find scoped singular', function () {
    assert.deepEqual(
      parse(`
        printf(_("msgid1"));
      `),
      [
        {
          key: 'msgid1',
          line: 2,
          plural: false
        }
      ]
    );
  });



  it('Should find plurals', function () {
    assert.deepEqual(
      parse(`
        const char* my_text = _p("My text", number);
        int i;
        const char* my_text2 =  _p("My text2", number);
      `),
      [
        {
          key: 'My text',
          line: 2,
          plural: true
        },
        {
          key: 'My text2',
          line: 4,
          plural: true
        }
      ]
    );
  });

  it('Should keep order of results by lines', function () {
    assert.deepEqual(
      parse(`
        const char* p1 = _p("plural 1", number);
        const char* s1 = _("singular 1");
        const char* p2 =  _p("plural 2", number);
      `),
      [
        {
          key: 'plural 1',
          line: 2,
          plural: true
        },
        {
          key: 'singular 1',
          line: 3,
          plural: false
        },
        {
          key: 'plural 2',
          line: 4,
          plural: true
        }
      ]
    );
  });

});
