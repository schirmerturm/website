import React from 'react';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default ({ stufe }) => {
  return (
    <div>
      <h2>Über die {stufe.name}{stufe.name == "Pfadi" ? '-Stufe' : ''}</h2>
      {documentToReactComponents(stufe.beschreibung.json)}
    </div>
  )
}
