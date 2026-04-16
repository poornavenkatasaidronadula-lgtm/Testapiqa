import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const testCases = [
  { id: 1, title: 'Register User', description: 'Launch browser, navigate to URL, verify home page, click Signup/Login, verify "New User Signup!" is visible, enter name and email, click Signup, fill details, create account, verify ACCOUNT CREATED! is visible, click Continue, verify LOGGED IN AS username, click Delete Account, verify ACCOUNT DELETED!.' },
  { id: 2, title: 'Login User with correct email and password', description: 'Launch browser, navigate to URL, verify home page, click Signup/Login, verify "Login to your account" is visible, enter correct email address and password, click login, verify LOGGED IN AS username at top.' },
  { id: 3, title: 'Login User with incorrect email and password', description: 'Launch browser, navigate to URL, verify home page, click Signup/Login, verify "Login to your account" is visible, enter incorrect email and password, click login, verify error "Your email or password is incorrect!" is visible.' },
  { id: 4, title: 'Logout User', description: 'Launch browser, navigate to URL, verify home page, click Signup/Login, verify "Login to your account" is visible, enter correct email and password, click login, verify LOGGED IN AS username, click Logout, verify user is navigated to login page.' },
  { id: 5, title: 'Register User with existing email', description: 'Launch browser, navigate to URL, verify home page, click Signup/Login, verify "New User Signup!" is visible, enter name and already registered email, click Signup, verify error "Email Address already exist!" is visible.' },
  { id: 6, title: 'Contact Us Form', description: 'Launch browser, navigate to URL, verify home page, click Contact us, verify GET IN TOUCH is visible, enter name, email, subject and message, upload file, click Submit button, click OK button, verify success message "Success! Your details have been submitted successfully." is visible, click Home button.' },
  { id: 7, title: 'Verify Test Cases Page', description: 'Launch browser, navigate to URL, verify home page, click on Test Cases button, verify user is navigated to test cases page successfully.' },
  { id: 8, title: 'Verify All Products and product detail page', description: 'Launch browser, navigate to URL, verify home page, click on Products button, navigate to ALL PRODUCTS page, verify the products list is visible, click on View Product of any product, verify user is landed to product detail page, verify product name, category, price, availability, condition, brand.' },
  { id: 9, title: 'Search Product', description: 'Launch browser, navigate to URL, verify home page, click on Products button, navigate to ALL PRODUCTS page, verify all products are visible, enter product name in search input and click search button, verify SEARCHED PRODUCTS is visible, verify all the products related to search are visible.' },
  { id: 10, title: 'Verify Subscription in home page', description: 'Launch browser, navigate to URL, verify home page, scroll down to footer, verify text SUBSCRIPTION, enter email address in input and click arrow button, verify success message "You have been successfully subscribed!" is visible.' },
  { id: 11, title: 'Verify Subscription in Cart page', description: 'Launch browser, navigate to URL, verify home page, click Cart button, scroll down to footer, verify text SUBSCRIPTION, enter email address in input and click arrow button, verify success message "You have been successfully subscribed!" is visible.' },
  { id: 12, title: 'Add Products in Cart', description: 'Launch browser, navigate to URL, verify home page, click Products button, hover over first product and click Add to cart, click Continue Shopping button, hover over second product, click Add to cart, click View Cart button, verify both products are added to Cart, verify their prices, quantity and total price.' },
  { id: 13, title: 'Verify Product quantity in Cart', description: 'Launch browser, navigate to URL, verify home page, click View Product for any product on home page, verify product detail is opened, increase quantity to 4, click Add to cart button, click View Cart button, verify that product is displayed in cart page with exact quantity.' },
  { id: 14, title: 'Place Order: Register while Checkout', description: 'Launch browser, navigate to URL, verify home page, add products to cart, click Cart button, verify that cart page is displayed, click Proceed To Checkout, click Register/Login button, fill all details in Signup and create account, verify ACCOUNT CREATED!, click Continue, verify LOGGED IN AS username, click Cart button, click Proceed To Checkout, verify Address Details and Review Your Order, enter description in comment text area and click Place Order, enter payment details, pay and confirm order, verify success message.' },
  { id: 15, title: 'Place Order: Register before Checkout', description: 'Launch browser, navigate to URL, verify home page, click Signup/Login button, fill all details in Signup and create account, verify ACCOUNT CREATED!, click Continue, verify LOGGED IN AS username, add products to cart, click Cart button, verify that cart page is displayed, click Proceed To Checkout, verify Address Details and Review Your Order, enter description in comment text area and click Place Order, enter payment details: Name on Card, Card Number, CVC, Expiration date, click Pay and Confirm Order button, verify success message.' },
  { id: 16, title: 'Place Order: Login before Checkout', description: 'Launch browser, navigate to URL, verify home page, click Signup/Login button, enter correct email and password, click login, verify LOGGED IN AS username, add products to cart, click Cart button, verify that cart page is displayed, click Proceed To Checkout, verify Address Details and Review Your Order, enter description in comment text area and click Place Order, enter payment details, pay and confirm order, verify success message.' },
  { id: 17, title: 'Remove Products From Cart', description: 'Launch browser, navigate to URL, verify home page, add products to cart, click Cart button, verify that cart page is displayed, click X button corresponding to particular product, verify that product is removed from the cart.' },
  { id: 18, title: 'View Category Products', description: 'Launch browser, navigate to URL, verify that categories are visible on left side bar, click on "Women" category, click on any category link underneath it e.g. Dress, verify that category page is displayed and confirm text "WOMEN - DRESS PRODUCTS" is visible on it, on Left Side Bar click on any sub-category link of "Men" category, verify that category page is displayed and confirm text with correct category name is visible on it.' },
  { id: 19, title: 'View & Cart Brand Products', description: 'Launch browser, navigate to URL, click on Products button, verify that Brands are visible on left side bar, click on any brand name, verify that user is navigated to brand page and brand products are displayed, click on any other brand link and verify that user is navigated to that brand page and can see products.' },
  { id: 20, title: 'Search Products and Verify Cart After Login', description: 'Launch browser, navigate to URL, click on Products button, verify all products are visible, search for a product, add those products to cart, click Cart button, verify the products are visible in cart, click Signup/Login button and submit login details, verify correct that cart page has those products.' },
  { id: 21, title: 'Add review on product', description: 'Launch browser, navigate to URL, click on Products button, verify user is navigated to ALL PRODUCTS page, click on View Product button, verify user is landed to product detail page, verify "Write Your Review" is visible, enter name, email and review, click Submit button, verify success message "Thank you for your review.".' },
  { id: 22, title: 'Add to cart from Recommended items', description: 'Launch browser, navigate to URL, scroll to bottom of page, verify RECOMMENDED ITEMS are visible, click on Add To Cart on Recommended product, click on View Cart button, verify that product is displayed in cart page.' },
  { id: 23, title: 'Verify address details in checkout page', description: 'Launch browser, navigate to URL, click Signup/Login button, register a new account, click Continue button, verify LOGGED IN AS username, add products to cart, click Cart button, click Proceed To Checkout, verify that the Delivery Address is same address filled at the time of registration. Verify that the Billing Address is same address filled at the time of registration.' },
  { id: 24, title: 'Download Invoice after purchase order', description: 'Launch browser, navigate to URL, add products to cart, proceed with checkout, place order, verify order placed, click Download Invoice button, verify invoice is downloaded successfully, click Continue button, verify that user is taken to the home page.' },
  { id: 25, title: 'Verify Scroll Up using Arrow button and Scroll Down functionality', description: 'Launch browser, navigate to URL, verify home page, scroll down the page, verify SUBSCRIPTION text is visible, click on arrow at bottom right side of page to scroll up, verify that page is scrolled up and FULL-FLEDGED PRACTICE WEBSITE FOR AUTOMATION ENGINEERS text is visible on screen.' },
  { id: 26, title: 'Verify Scroll Up without Arrow button and Scroll Down functionality', description: 'Launch browser, navigate to URL, verify home page, scroll down the page, verify SUBSCRIPTION text is visible, scroll up the page, verify that page is scrolled up and FULL-FLEDGED PRACTICE WEBSITE FOR AUTOMATION ENGINEERS text is visible on screen.' },
];

export default function TestCases() {
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h1>📋 Test Cases</h1>
        <p>Comprehensive test scenarios for automation practice</p>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <div className="breadcrumb-inner">
            <Link to="/">Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Test Cases</span>
          </div>
        </div>
      </div>

      <div className="test-cases-page">
        <div className="container">
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--orange-light), #fff)',
              border: '1px solid rgba(255,107,53,0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{ fontSize: '2.5rem' }}>🧪</div>
              <div>
                <h3 style={{ marginBottom: '4px', fontWeight: 700 }}>Practice Test Cases</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                  {testCases.length} test cases available for automation practice. Click any test case to expand its steps.
                  These cover registration, login, cart, checkout, and more.
                </p>
              </div>
            </div>
          </div>

          {testCases.map((tc) => (
            <div key={tc.id} className="test-case-card">
              <div
                className="test-case-header"
                onClick={() => setExpanded(expanded === tc.id ? null : tc.id)}
              >
                <div className="test-case-number">{tc.id}</div>
                <h3>Test Case {tc.id}: {tc.title}</h3>
                <span style={{
                  color: 'var(--text-gray)',
                  fontSize: '1.1rem',
                  transition: 'transform 0.3s',
                  transform: expanded === tc.id ? 'rotate(180deg)' : 'rotate(0)',
                }}>
                  ▼
                </span>
              </div>
              {expanded === tc.id && (
                <div className="test-case-body">
                  <p><strong>Steps:</strong> {tc.description}</p>
                </div>
              )}
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a
              href="/test-cases"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '14px 36px' }}
            >
              🔌 Also Check: API Testing List
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
