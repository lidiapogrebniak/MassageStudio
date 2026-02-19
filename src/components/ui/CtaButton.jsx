import React from 'react'
import styles from './CtaButton.module.css';
import { texts as t } from '../../data/texts.uk';
import {Button} from 'react-bootstrap';


const CtaButton = (props) => {
  const { text, className = '' } = props;
  return (
    <Button className={`btn btn-lg ${className || styles.ctaButton}`}>
        {text || t.ctaButton.text}
    </Button>
  )
}

export default CtaButton