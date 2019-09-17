import React from 'react';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default ({ stufe }) => {
  return (
    <div>
      <h1>{stufe.name}</h1>
      <h2>Über die {stufe.name}-Stufe</h2>
      {documentToReactComponents(stufe.beschreibung.json)}
    </div>
  )
}