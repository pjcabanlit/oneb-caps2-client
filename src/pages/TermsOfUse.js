import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import './TermsOfUse.css'

const TermsOfUse = () => {
    return (
        <div className='termsOfUse_container'>
            <Navbar />
            <div className='termsOfUse_section'>
                <h1>Terms Of Use</h1>
                <p>The statistical tables (or datasets) including documents (collectively referred to as material) on this site are classified under Open Data with Creative Commons Attribution License (cc-by). This means that you are free to share (copy and redistribute) the material in any medium or format; remix, transform and build upon the material for any purpose, non-commercial and even commercially under the following conditions:</p>
                <ul>
                    <li>Attribution - you must give appropriate credit by acknowledging the Philippine Statistics Authority (PSA) or the source agency as indicated in the datasets, provide a link to this page, and indicate if changes were You may do so in any reasonable manner, but not in any way that suggests the PSA or the source agency endorses you or your use. In addition, all technical notes or explanations needed for better understanding the data should be incorporated.</li>
                    <li>No additional restrictions - you may not apply legal terms or technological measures that legally restrict others from doing anything the license</li>
                </ul>
                <h3>Disclaimer of Warranties and Limitation of Liability:</h3>
                <p>Unless otherwise separately undertaken by the PSA (Licensor), to the extent possible, the PSA (Licensor) offers the Licensed Material as-is and as-available, and makes no representations or warranties of any kind concerning the Licensed Material, whether express, implied, statutory, or other. This includes, without limitation, warranties of title, merchantability, fitness for a particular purpose, non-infringement, absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not known or discoverable. Where disclaimers of warranties are not allowed in full or in part, this disclaimer may not apply to you.</p>
                <p>To the extent possible, in no event will the PSA (Licensor) be liable to you on any legal theory (including, without limitation, negligence) or otherwise for any direct, special, indirect, incidental, consequential, punitive, exemplary, or other losses, costs, expenses, or damages arising out of this Public License or use of the Licensed Material, even if the PSA (Licensor) has been advised of the possibility of such losses, costs, expenses, or damages. Where a limitation of liability is not allowed in full or in part, this limitation may not apply to you.</p>
            </div>

            {window.innerWidth <= 600 ? "" : <Footer />}

        </div>
    )
}

export default TermsOfUse