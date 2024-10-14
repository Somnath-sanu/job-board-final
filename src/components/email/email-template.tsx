import * as React from "react";

interface EmailTemplateProps {
  title: string;
  type: string;
  companyName: string;
  location?: string;
  applicationEmail?: string;
  applicationUrl?: string;
  description?: string;
  salary: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  title,
  type,
  companyName,
  location,
  applicationEmail,
  applicationUrl,
  description,
  salary,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f4f4f4",
    }}
  >
    <h1 style={{ color: "#333", textAlign: "center" }}>New Job Opportunity</h1>
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "5px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#0066cc" }}>Title : {title}</h2>
      <p style={{ fontWeight: "bold" }}>CompanyName: {companyName}</p>
      <p>Job Type: {type}</p>
      {location && <p>Location: {location}</p>}
      <p>Salary: {salary}</p>
      {description && (
        <div>
          <h3>Job Description:</h3>
          <p>{description}</p>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <h3>How to Apply:</h3>
        {applicationEmail && (
          <p>
            Send your application to:{" "}
            <a href={`mailto:${applicationEmail}`} style={{ color: "#0066cc" }}>
              {applicationEmail}
            </a>
          </p>
        )}
        {applicationUrl && (
          <p>
            Apply online at:{" "}
            <a href={applicationUrl} style={{ color: "#0066cc" }}>
              {applicationUrl}
            </a>
          </p>
        )}
      </div>
    </div>
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        fontSize: "12px",
        color: "#666",
      }}
    >
      <p>
        This email was sent to you because you subscribed to job alerts from
        JobHunt.
      </p>
    </div>
  </div>
);
