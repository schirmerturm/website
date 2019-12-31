import React from 'react';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from '@contentful/rich-text-types'
import stufeStyles from './ueber-stufe.module.css'

export default ({ stufe }) => {
  return (
    <div>
      <h2>Über die {stufe.name}{stufe.name == "Pfadi" ? '-Stufe' : ''}</h2>
      {documentToReactComponents(stufe.beschreibung.json, options)}
    </div>
  )
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { url } = node.data.target.fields.bild['en-US'].fields.file['en-US']
      const name = node.data.target.fields.name['en-US']
      const pfadiName = node.data.target.fields.pfadiName['en-US']
      return <div className={stufeStyles.portraitContainer}>
        <img className={stufeStyles.portrait} src={`https:${url}`} />
        <div>{name}, {pfadiName}</div>
      </div>
    }
  }
}
