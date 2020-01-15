import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import Carousel from '../components/carousel';
import stufeStyles from '../components/ueber-stufe.module.css'
import Expandable from '../components/expandable'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      try {
        switch (node.data.target.sys.contentType.sys.id) {
          case "bildKarussel":
            return renderBildKarussel(node)
          case "leiterPortrait":
            return renderLeiterPortrait(node)
          case "dropdown":
            return renderExpandable(node)
          default:
            return (<div id="unknown-content"></div>)
        }
      } catch (e) {
        // If the entry type could not be determined, return an empty div
        return <div>Unknown</div>
      }
    }
  }
}

const renderLeiterPortrait = (node) => {
  const { url } = node.data.target.fields.bild['en-US'].fields.file['en-US']
  const name = node.data.target.fields.name['en-US']
  const pfadiName = node.data.target.fields.pfadiName['en-US']
  let funktion
  if (node.data.target.fields.rolle) {
    funktion = node.data.target.fields.rolle['en-US']
  }

  return (
  <div className={stufeStyles.portraitContainer}>
    <img className={stufeStyles.portrait} src={`https:${url}`} />
    <div>{name}, {pfadiName}</div>
    <div className={stufeStyles.funktion}>{funktion}</div>
  </div>
)}

const renderBildKarussel = (node) => {
  const nodes = node.data.target.fields.bilder['en-US']
  const urls = nodes.map(node => node.fields.file['en-US'].url)
  return <Carousel urls={urls} />
}

const renderExpandable = (node) => {
  const title = node.data.target.fields.title['en-US']
  const body = node.data.target.fields.beschreibung['en-US']
  return <Expandable title={title} body={body} />
}

export default options
