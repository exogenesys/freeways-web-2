const config = {
  bucket: {
    slug: 'freeways' // add your bucket slug here
  }
}

const params = {
  slug: 'agra'
}

import Cosmic from 'cosmicjs'
export default {
  getDestination(slug) {
    const data = new Promise(resolve => {
      Cosmic.getObject(config, { slug },(err, res) => {
        console.log('res', res);
        resolve(res)
      })
    })
    return data
  }
}
