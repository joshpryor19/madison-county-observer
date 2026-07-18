/**
 * Optional, privacy-conscious interaction events for an existing Google gtag setup.
 * Do not load a second GA library. Do not send names, emails, messages, or article text.
 */
(function () {
  "use strict";

  function track(eventName, parameters) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", eventName, parameters || {});
  }

  document.addEventListener("click", function (event) {
    var related = event.target.closest("[data-mco-related-file]");
    if (related) {
      track("related_file_click", {
        destination_path: related.getAttribute("href") || "unknown",
        source_component: related.dataset.mcoRelatedFile || "related_file"
      });
    }

    var department = event.target.closest("[data-mco-department-link]");
    if (department) {
      track("department_navigation", {
        department: department.dataset.mcoDepartmentLink || "unknown"
      });
    }

    var sponsor = event.target.closest("[data-mco-sponsor-link]");
    if (sponsor) {
      track("sponsor_click", {
        sponsor_id: sponsor.dataset.mcoSponsorLink || "unknown"
      });
    }
  });

  document.addEventListener("focusin", function (event) {
    if (event.target.closest("[data-mco-field-report-form]")) {
      track("field_report_start");
    }
  }, { once: true });

  document.addEventListener("submit", function (event) {
    if (event.target.matches("[data-mco-newsletter-form]")) {
      track("newsletter_signup", { form_location: event.target.dataset.location || "unknown" });
    }

    if (event.target.matches("[data-mco-field-report-form]")) {
      track("field_report_submit");
    }
  });
}());
