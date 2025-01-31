import React from 'react';
import { kname } from '../../common/utils';

const Contactus = () => {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white dark:bg-dark">
            <div className="container px-3">
                <div className="row mt-5">
                    <div className="col-md-6 p-5 bg-light dark:bg-dark rounded">
                        <h1 className="display-4 text-dark dark:text-white fw-bold">
                            Get in touch
                        </h1>
                        <p className="lead text-secondary dark:text-light mt-2">
                            Fill in the form to start a conversation
                        </p>

                        <div className="mt-4 text-secondary dark:text-light">
                            <div className="d-flex align-items-center mb-3">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="bi bi-telephone w-25 h-25 text-muted">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="ms-3 fs-5 fw-semibold">
                                    +977 1234567890
                                </div>
                            </div>

                            <div className="d-flex align-items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="bi bi-envelope w-25 h-25 text-muted">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div className="ms-3 fs-5 fw-semibold">
                                    <a href="http://localhost:3000">https:/{kname}.com/</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="col-md-6 p-5 d-flex flex-column justify-content-center">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label visually-hidden">Full Name</label>
                            <input type="text" name="name" id="name" placeholder="Full Name" className="form-control py-3 px-3 rounded bg-white dark:bg-dark border-1 border-secondary text-dark dark:text-white" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label visually-hidden">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" className="form-control py-3 px-3 rounded bg-white dark:bg-dark border-1 border-secondary text-dark dark:text-white" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label visually-hidden">Message</label>
                            <textarea name="message" id="message" placeholder="Your Message" className="form-control py-3 px-3 rounded bg-white dark:bg-dark border-1 border-secondary text-dark dark:text-white"></textarea>
                        </div>

                        <button type="submit" className="btn btn-dark hover:bg-indigo-500 text-white fw-bold py-3 px-6 rounded mt-3 transition duration-300">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contactus;
