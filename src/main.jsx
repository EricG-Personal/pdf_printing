import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import jsPDF from 'jsPDF';

import './main.css';

class PDFTest extends Component 
{
    constructor( props ) 
    {
        super(props);

        this.state = {
            file:     './sample.pdf',
            numPages: null,
            pdfData:  null
        }
        
        var doc = new jsPDF({unit: 'pt', format: 'legal'});
        var someText = "hello, world!";
        var topCoordinate = 72;
        var leftCoordinate = 72;
        var padding = 8;

        doc.setFont( "helvetica" );
        doc.setFontSize( 24 );

        var lineHeight 		= doc.getLineHeight();
        var textWidth  		= doc.getTextWidth( someText );
        var rectHeight 		= ( lineHeight + ( padding * 2 ) );
        var halfRectHeight 	= rectHeight / 2;
        var halfLineHeight	= lineHeight / 2;
        var textYCoordinate = topCoordinate + halfRectHeight + halfLineHeight;

        console.log( "Height: " + lineHeight );
        console.log( "Width: " + textWidth );

        doc.setDrawColor( 255, 0, 0 );
        doc.rect( leftCoordinate, topCoordinate, textWidth, rectHeight );
        doc.text( someText, leftCoordinate + padding, textYCoordinate );

        doc.setDrawColor( 0, 0, 0 );
        doc.rect( leftCoordinate, textYCoordinate - lineHeight, textWidth, lineHeight );

        var blob   = doc.output( 'bloburl' );
        var mythis = this;

        setTimeout( function() 
        { 
            console.log( "Setting State" );

            mythis.setState({pdfData: blob});
        }, 5000);


        console.log( blob );


    }



    componentDidUpdate()
    {
        console.log( "componentDidUpdate" );
    }



    iframeloaded()
    {
        console.log( "iframe loaded" );
        console.log( window.frames );

        window.frames["pdf_doc"].focus();
        window.frames["pdf_doc"].print();
    }



    render() 
    {
        return (
            <div width="100%" height="100%"> 
                <iframe id="pdf_doc" src={this.state.pdfData} type="application/pdf" width="100%" height="100%" style={{overflow: 'auto'}} onLoad={this.iframeloaded.bind( this )}>
                </iframe>
            </div>
        );
    }
}

const app = (
    <div>
        <PDFTest />
    </div>
);

const mountingPoint = document.createElement( 'div' );

mountingPoint.className = 'react-app';

document.body.appendChild( mountingPoint );

ReactDOM.render( app, mountingPoint );