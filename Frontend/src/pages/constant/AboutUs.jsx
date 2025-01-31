import React from 'react';
import { kname } from '../../common/utils';

const AboutUs = () => {

    return (
        <>
            <section className="pt-5 bg-light overflow-hidden">
                <div className="container px-4">
                    <div className="row align-items-center">
                        <div className="col-md-6-center">
                            <h2 className="display-4 fw-bold text-dark">{kname}</h2>
                            <p className="mt-3 fs-4 text-secondary">
                                Welcome to <strong>{kname}</strong>, your premier destination for buying and selling exquisite paintings and art pieces. At {kname}, we believe in the power of art to transform spaces and inspire creativity. Our platform connects artists and art enthusiasts from around the world, making it easy to discover and acquire unique artworks.
                            </p>
                            <p className="mt-4 fs-4 text-secondary">
                                <span className="position-relative d-inline-block">
                                    <span className="position-absolute w-100 bottom-0 start-0 h-100 bg-warning"></span>
                                    <span className="position-relative">Have a question?</span>
                                </span>
                                <br className="d-block d-sm-none" />Ask me on <a href="#" title="" className="text-primary text-decoration-underline">Twitter</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutUs;
