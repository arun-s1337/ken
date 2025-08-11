import React from 'react'
import "./Termspage.css"


function Termspage() {
  return (
    <div className='container termsandconditions p-2 mt-10 p-lg-4 sm:w-full flex flex-col gap-3'>
        <h4>Terms and Conditions</h4>
        <p>This disclaimer is intended to inform users that the information provided on the website is for general informational and educational purposes only. It is not a replacement for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before making any decisions related to your health, and never disregard professional medical advice based on the information you find online.</p>
        <h6>Key Points of the Disclaimer:</h6>
        <ol>
            <li><b>Purpose:</b> The website aims to provide general health knowledge and education, not specific medical advice.</li>
            <li><b>Not a Substitute for Professional Medical Advice: </b>The information on the website is not meant to diagnose, treat, or provide guidance on medical conditions.</li>
            <li><b>Consult a Healthcare Professional:</b> Always seek advice from a doctor or other qualified healthcare provider before making any decisions regarding your health or treatment.</li>
        </ol>
<h6>How to Interpret This Disclaimer:</h6>
<ol className='lst'>
    <li>If you have questions about a medical condition, treatment, or medication, always consult your doctor for accurate and personalized guidance.</li>
    <li>Do not rely solely on the information provided on the website for making health-related decisions.</li>
    <li>If you are unsure about anything you read, seek professional medical advice to clarify your concerns.</li>
</ol>
<p>In summary, this disclaimer emphasizes the importance of professional medical guidance and advises users to avoid making health decisions based only on online information.</p>
    </div>
  )
}

export default Termspage