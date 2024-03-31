import React, { useState } from 'react';
import Terms from './Terms';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <footer className="footer">
            <p>
                <span onClick={openModal}>Terms and Conditions</span>
            </p>
            <p>&copy; {currentYear}  TreeBlog. All rights reserved.</p>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>
                            Close
                        </button>
                        <Terms />
                    </div>
                </div>
            )}
        </footer>
    );
}

export default Footer;
