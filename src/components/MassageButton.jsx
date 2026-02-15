import React from 'react'
import '../styles/MassageButton.css';
import { texts as t } from '../data/texts.uk';
import {Button} from 'react-bootstrap';


const MassageButton = (props) => {
  const { text, className = '' } = props;
  return (
    <Button className={`btn btn-lg ${className || 'massage-cta-button'} `}>
        {text || t.ctaButton.text}
    </Button>
  )
}

export default MassageButton