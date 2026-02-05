import React from 'react'
import '../styles/MassageButton.css';
import { texts as t } from '../utils/texts.uk';
import {Button} from 'react-bootstrap';


const MassageButton = () => {
  return (
    <Button className="btn btn-lg massage-cta-button">
        {t.ctaButton.text}
    </Button>
  )
}

export default MassageButton