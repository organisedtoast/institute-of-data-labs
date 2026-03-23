function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Manchester United</h1>
      
      <section className="contact-section">
        <h2>Club Headquarters</h2>
        <p>
          <strong>Address:</strong><br />
          Manchester United Football Club<br />
          Sir Matt Busby Way<br />
          Old Trafford<br />
          Manchester M16 0RA<br />
          United Kingdom
        </p>
      </section>

      <section className="contact-section">
        <h2>Phone Enquiries</h2>
        <p>
          <strong>General Enquiries:</strong> +44 (0) 161 868 8000<br />
          <strong>Ticket Office:</strong> +44 (0) 161 868 8003<br />
          <strong>Museum & Stadium Tour:</strong> +44 (0) 161 868 8004
        </p>
      </section>

      <section className="contact-section">
        <h2>Email Contact</h2>
        <p>
          <strong>General Enquiries:</strong> enquiries@manutd.co.uk<br />
          <strong>Ticket Office:</strong> ticketoffice@manutd.co.uk<br />
          <strong>Membership:</strong> membership@manutd.co.uk
        </p>
      </section>

      <section className="contact-section">
        <h2>Opening Hours</h2>
        <p>
          <strong>Club Headquarters:</strong><br />
          Monday - Friday: 9:00 AM - 5:00 PM<br />
          Saturday - Sunday: Closed
        </p>
        <p>
          <strong>Ticket Office (Match Days):</strong><br />
          Opens 3 hours before kick-off until the end of the match
        </p>
      </section>

      <section className="contact-section">
        <h2>Follow Us on Social Media</h2>
        <p>
          <strong>Twitter:</strong> @ManUtd<br />
          <strong>Instagram:</strong> @manchesterunited<br />
          <strong>Facebook:</strong> /manchesterunited<br />
          <strong>YouTube:</strong> Manchester United
        </p>
      </section>

      <section className="contact-section">
        <h2>Send Us a Message</h2>
        <p>
          For all other enquiries, please visit our official website at{' '}
          <a href="https://www.manutd.com" target="_blank" rel="noopener noreferrer">
            www.manutd.com
          </a>{' '}
          and use the online contact form.
        </p>
      </section>
    </div>
  );
}

export default Contact;
