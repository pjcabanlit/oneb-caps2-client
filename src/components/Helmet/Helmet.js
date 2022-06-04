import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
const Helm = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" /> <title>{title}</title> <meta name="robots" content="noindex, follow" /> <meta name="description" content="Hope – Health &amp; Medical React JS Template" /> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Helmet>
    )
}
Helm.propTypes = {
    title: PropTypes.string,
};
export default Helm