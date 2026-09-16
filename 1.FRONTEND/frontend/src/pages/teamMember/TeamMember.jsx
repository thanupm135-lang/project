import React, { useState } from "react";

const TeamMemberDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [taskFilter, setTaskFilter] = useState("All");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Login Page",
      project: "ERP Management System",
      priority: "High",
      status: "In Progress",
      deadline: "Sep 18, 2026",
      progress: 65,
    },
    {
      id: 2,
      title: "Create Database Documentation",
      project: "ERP Management System",
      priority: "Medium",
      status: "Pending",
      deadline: "Sep 20, 2026",
      progress: 20,
    },
    {
      id: 3,
      title: "Test User Authentication",
      project: "ERP Management System",
      priority: "High",
      status: "Completed",
      deadline: "Sep 15, 2026",
      progress: 100,
    },
    {
      id: 4,
      title: "Prepare API Integration",
      project: "ERP Management System",
      priority: "Low",
      status: "Pending",
      deadline: "Sep 23, 2026",
      progress: 0,
    },
  ]);

  const [messages] = useState([
    {
      id: 1,
      sender: "Team Lead",
      message: "Please update the login page progress.",
      time: "10:20 AM",
    },
    {
      id: 2,
      sender: "Arun",
      message: "I have completed the API documentation.",
      time: "10:05 AM",
    },
    {
      id: 3,
      sender: "Team Lead",
      message: "Team meeting at 4:00 PM today.",
      time: "9:45 AM",
    },
  ]);

  const [newWorkUpdate, setNewWorkUpdate] = useState("");

  const filteredTasks =
    taskFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === taskFilter);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              progress:
                newStatus === "Completed"
                  ? 100
                  : newStatus === "In Progress"
                  ? Math.max(task.progress, 10)
                  : 0,
            }
          : task
      )
    );
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const overallProgress =
    tasks.length > 0
      ? Math.round(
          tasks.reduce((total, task) => total + task.progress, 0) /
            tasks.length
        )
      : 0;

  const handleWorkUpdate = (event) => {
    event.preventDefault();

    if (!newWorkUpdate.trim()) {
      return;
    }

    alert("Work update submitted successfully.");
    setNewWorkUpdate("");
  };

  const styles = `
    * {
      box-sizing: border-box;
    }

    .tm-dashboard {
      min-height: 100vh;
      background: #f5f7fb;
      color: #172033;
      font-family: Arial, Helvetica, sans-serif;
    }

    .tm-layout {
      display: flex;
      min-height: 100vh;
    }

    /* =========================
       SIDEBAR
    ========================= */

    .tm-sidebar {
      width: 250px;
      min-height: 100vh;
      background: #111827;
      color: white;
      padding: 22px 16px;
      position: sticky;
      top: 0;
      align-self: flex-start;
    }

    .tm-logo {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 0 10px 26px;
      border-bottom: 1px solid #263142;
      margin-bottom: 22px;
    }

    .tm-logo-icon {
      width: 38px;
      height: 38px;
      border-radius: 9px;
      background: #2563eb;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
    }

    .tm-logo h2 {
      margin: 0;
      font-size: 17px;
    }

    .tm-logo span {
      display: block;
      color: #9ca3af;
      font-size: 10px;
      margin-top: 3px;
    }

    .tm-nav-title {
      color: #6b7280;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 10px 9px;
    }

    .tm-nav {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .tm-nav-button {
      width: 100%;
      border: none;
      background: transparent;
      color: #cbd5e1;
      padding: 12px 13px;
      border-radius: 8px;
      text-align: left;
      cursor: pointer;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 11px;
      transition: 0.2s ease;
    }

    .tm-nav-button:hover {
      background: #1f2937;
      color: white;
    }

    .tm-nav-button.active {
      background: #2563eb;
      color: white;
    }

    .tm-nav-icon {
      width: 20px;
      text-align: center;
      font-size: 15px;
    }

    .tm-project-box {
      margin-top: 30px;
      padding: 14px;
      border-radius: 10px;
      background: #1a2332;
      border: 1px solid #293548;
    }

    .tm-project-box small {
      color: #9ca3af;
      font-size: 10px;
    }

    .tm-project-box h4 {
      margin: 7px 0 3px;
      font-size: 13px;
    }

    .tm-project-box p {
      margin: 0;
      color: #9ca3af;
      font-size: 10px;
    }

    .tm-project-role {
      margin-top: 11px;
      display: inline-block;
      padding: 4px 8px;
      background: #1e40af;
      color: #dbeafe;
      border-radius: 5px;
      font-size: 10px;
    }

    /* =========================
       MAIN
    ========================= */

    .tm-main {
      flex: 1;
      min-width: 0;
    }

    .tm-topbar {
      height: 72px;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      position: sticky;
      top: 0;
      z-index: 20;
    }

    .tm-breadcrumb {
      color: #6b7280;
      font-size: 13px;
    }

    .tm-breadcrumb strong {
      color: #172033;
    }

    .tm-top-actions {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .tm-notification {
      width: 36px;
      height: 36px;
      border: 1px solid #e5e7eb;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      position: relative;
      font-size: 16px;
    }

    .tm-notification-badge {
      position: absolute;
      right: -2px;
      top: -4px;
      width: 16px;
      height: 16px;
      background: #ef4444;
      color: white;
      border-radius: 50%;
      font-size: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tm-profile-wrapper {
      position: relative;
    }

    .tm-profile-button {
      border: none;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      padding: 3px;
    }

    .tm-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #2563eb;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }

    .tm-profile-info {
      text-align: left;
    }

    .tm-profile-info strong {
      display: block;
      font-size: 12px;
      color: #172033;
    }

    .tm-profile-info span {
      display: block;
      font-size: 10px;
      color: #7b8495;
      margin-top: 2px;
    }

    .tm-profile-menu {
      position: absolute;
      right: 0;
      top: 48px;
      width: 160px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 9px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      padding: 7px;
      z-index: 50;
    }

    .tm-profile-menu button {
      width: 100%;
      border: none;
      background: transparent;
      text-align: left;
      padding: 9px 10px;
      border-radius: 6px;
      cursor: pointer;
      color: #374151;
      font-size: 12px;
    }

    .tm-profile-menu button:hover {
      background: #f3f4f6;
    }

    /* =========================
       CONTENT
    ========================= */

    .tm-content {
      padding: 28px 30px;
    }

    .tm-page-heading {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 25px;
    }

    .tm-page-heading h1 {
      margin: 0;
      font-size: 27px;
      font-weight: 700;
    }

    .tm-page-heading p {
      margin: 7px 0 0;
      color: #6b7280;
      font-size: 13px;
    }

    .tm-project-selector {
      border: 1px solid #dce1e8;
      background: white;
      border-radius: 8px;
      padding: 10px 13px;
      font-size: 12px;
      color: #374151;
      outline: none;
    }

    /* =========================
       STAT CARDS
    ========================= */

    .tm-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 22px;
    }

    .tm-stat-card {
      background: white;
      border: 1px solid #e5e9f0;
      border-radius: 11px;
      padding: 19px;
    }

    .tm-stat-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .tm-stat-label {
      color: #7b8495;
      font-size: 12px;
    }

    .tm-stat-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: #eff6ff;
      color: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
    }

    .tm-stat-value {
      font-size: 25px;
      font-weight: 700;
      margin-top: 12px;
    }

    .tm-stat-note {
      color: #8a94a6;
      font-size: 10px;
      margin-top: 4px;
    }

    /* =========================
       GRID
    ========================= */

    .tm-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.7fr) minmax(270px, 0.8fr);
      gap: 20px;
    }

    .tm-card {
      background: white;
      border: 1px solid #e5e9f0;
      border-radius: 11px;
      padding: 21px;
      margin-bottom: 20px;
    }

    .tm-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      margin-bottom: 19px;
    }

    .tm-card-header h3 {
      margin: 0;
      font-size: 16px;
    }

    .tm-card-header p {
      margin: 5px 0 0;
      color: #7b8495;
      font-size: 11px;
    }

    .tm-view-all {
      border: none;
      background: transparent;
      color: #2563eb;
      cursor: pointer;
      font-size: 11px;
      font-weight: 600;
    }

    /* =========================
       TASK TABLE
    ========================= */

    .tm-filter-buttons {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .tm-filter-button {
      border: 1px solid #e2e6ec;
      background: white;
      color: #6b7280;
      border-radius: 6px;
      padding: 6px 9px;
      font-size: 10px;
      cursor: pointer;
    }

    .tm-filter-button.active {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #2563eb;
      font-weight: 600;
    }

    .tm-task-list {
      display: flex;
      flex-direction: column;
    }

    .tm-task {
      border-top: 1px solid #edf0f4;
      padding: 15px 0;
    }

    .tm-task:first-child {
      border-top: none;
      padding-top: 0;
    }

    .tm-task-main {
      display: flex;
      justify-content: space-between;
      gap: 15px;
    }

    .tm-task-title {
      margin: 0;
      color: #273142;
      font-size: 13px;
      font-weight: 600;
    }

    .tm-task-project {
      color: #8a94a6;
      font-size: 10px;
      margin-top: 5px;
    }

    .tm-task-meta {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .tm-badge {
      display: inline-flex;
      align-items: center;
      padding: 5px 8px;
      border-radius: 5px;
      font-size: 9px;
      font-weight: 600;
    }

    .tm-priority-high {
      background: #fef2f2;
      color: #dc2626;
    }

    .tm-priority-medium {
      background: #fffbeb;
      color: #d97706;
    }

    .tm-priority-low {
      background: #eff6ff;
      color: #2563eb;
    }

    .tm-status-completed {
      background: #ecfdf3;
      color: #15803d;
    }

    .tm-status-progress {
      background: #eff6ff;
      color: #2563eb;
    }

    .tm-status-pending {
      background: #f3f4f6;
      color: #6b7280;
    }

    .tm-task-bottom {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .tm-progress-track {
      flex: 1;
      height: 6px;
      background: #edf0f4;
      border-radius: 10px;
      overflow: hidden;
    }

    .tm-progress-bar {
      height: 100%;
      background: #2563eb;
      border-radius: 10px;
      transition: width 0.3s ease;
    }

    .tm-progress-text {
      width: 35px;
      text-align: right;
      color: #6b7280;
      font-size: 10px;
    }

    .tm-deadline {
      color: #7b8495;
      font-size: 10px;
      white-space: nowrap;
    }

    .tm-task-status-select {
      border: 1px solid #e1e5eb;
      background: white;
      border-radius: 5px;
      padding: 5px;
      color: #4b5563;
      font-size: 9px;
      outline: none;
      cursor: pointer;
    }

    /* =========================
       PROJECT PROGRESS
    ========================= */

    .tm-overall-progress {
      text-align: center;
      padding: 8px 0 20px;
    }

    .tm-circle {
      width: 145px;
      height: 145px;
      margin: 0 auto 15px;
      border-radius: 50%;
      background: conic-gradient(
        #2563eb ${overallProgress}%,
        #e8edf4 ${overallProgress}%
      );
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tm-circle-inner {
      width: 113px;
      height: 113px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .tm-circle-inner strong {
      font-size: 25px;
    }

    .tm-circle-inner span {
      font-size: 10px;
      color: #8a94a6;
      margin-top: 3px;
    }

    .tm-progress-summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 15px;
    }

    .tm-summary-item {
      padding: 10px 5px;
      background: #f8fafc;
      border-radius: 7px;
    }

    .tm-summary-item strong {
      display: block;
      font-size: 16px;
    }

    .tm-summary-item span {
      display: block;
      color: #8a94a6;
      font-size: 9px;
      margin-top: 3px;
    }

    /* =========================
       NOTIFICATIONS
    ========================= */

    .tm-notification-list {
      display: flex;
      flex-direction: column;
    }

    .tm-notification-item {
      display: flex;
      gap: 10px;
      padding: 12px 0;
      border-top: 1px solid #edf0f4;
    }

    .tm-notification-item:first-child {
      border-top: none;
      padding-top: 0;
    }

    .tm-notification-icon {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 7px;
      background: #eff6ff;
      color: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .tm-notification-text p {
      margin: 0;
      color: #374151;
      font-size: 10px;
      line-height: 1.5;
    }

    .tm-notification-text span {
      display: block;
      color: #9ca3af;
      font-size: 9px;
      margin-top: 4px;
    }

    /* =========================
       TEAM CHAT
    ========================= */

    .tm-chat-list {
      display: flex;
      flex-direction: column;
    }

    .tm-message {
      display: flex;
      gap: 10px;
      padding: 11px 0;
      border-top: 1px solid #edf0f4;
    }

    .tm-message:first-child {
      border-top: none;
      padding-top: 0;
    }

    .tm-message-avatar {
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      border-radius: 50%;
      background: #e0e7ff;
      color: #3730a3;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
    }

    .tm-message-content {
      min-width: 0;
      flex: 1;
    }

    .tm-message-top {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }

    .tm-message-top strong {
      font-size: 10px;
      color: #374151;
    }

    .tm-message-top span {
      color: #9ca3af;
      font-size: 8px;
    }

    .tm-message-content p {
      margin: 4px 0 0;
      color: #7b8495;
      font-size: 10px;
      line-height: 1.4;
    }

    .tm-chat-button {
      width: 100%;
      margin-top: 12px;
      border: 1px solid #dbe3ef;
      background: #f8fafc;
      color: #2563eb;
      border-radius: 7px;
      padding: 9px;
      cursor: pointer;
      font-size: 10px;
      font-weight: 600;
    }

    .tm-chat-button:hover {
      background: #eff6ff;
    }

    /* =========================
       WORK UPDATE
    ========================= */

    .tm-work-update textarea {
      width: 100%;
      min-height: 105px;
      resize: vertical;
      border: 1px solid #dce1e8;
      border-radius: 8px;
      padding: 12px;
      font-family: inherit;
      font-size: 12px;
      color: #374151;
      outline: none;
    }

    .tm-work-update textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
    }

    .tm-work-update-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }

    .tm-submit-button {
      border: none;
      background: #2563eb;
      color: white;
      border-radius: 7px;
      padding: 9px 15px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 600;
    }

    .tm-submit-button:hover {
      background: #1d4ed8;
    }

    /* =========================
       OTHER TABS
    ========================= */

    .tm-section-title {
      margin: 0 0 8px;
      font-size: 23px;
    }

    .tm-section-description {
      margin: 0 0 24px;
      color: #7b8495;
      font-size: 13px;
    }

    .tm-empty-state {
      text-align: center;
      padding: 55px 20px;
      color: #7b8495;
    }

    .tm-empty-state-icon {
      font-size: 35px;
      margin-bottom: 12px;
    }

    .tm-empty-state h3 {
      margin: 0 0 7px;
      color: #374151;
      font-size: 16px;
    }

    .tm-empty-state p {
      margin: 0;
      font-size: 12px;
    }

    /* =========================
       MOBILE
    ========================= */

    @media (max-width: 1100px) {
      .tm-stats {
        grid-template-columns: repeat(2, 1fr);
      }

      .tm-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 800px) {
      .tm-layout {
        display: block;
      }

      .tm-sidebar {
        width: 100%;
        min-height: auto;
        position: relative;
      }

      .tm-nav {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }

      .tm-project-box {
        display: none;
      }

      .tm-topbar {
        position: relative;
        padding: 0 18px;
      }

      .tm-content {
        padding: 22px 18px;
      }
    }

    @media (max-width: 600px) {
      .tm-stats {
        grid-template-columns: 1fr;
      }

      .tm-nav {
        grid-template-columns: repeat(2, 1fr);
      }

      .tm-profile-info {
        display: none;
      }

      .tm-page-heading {
        flex-direction: column;
      }

      .tm-project-selector {
        width: 100%;
      }

      .tm-task-main {
        flex-direction: column;
      }

      .tm-task-meta {
        justify-content: flex-start;
      }

      .tm-task-bottom {
        flex-wrap: wrap;
      }

      .tm-progress-track {
        min-width: 100%;
        order: 1;
      }

      .tm-progress-text {
        width: auto;
      }

      .tm-deadline {
        order: 2;
      }

      .tm-task-status-select {
        order: 3;
      }
    }
  `;

  return (
    <div className="tm-dashboard">
      <style>{styles}</style>

      <div className="tm-layout">
        {/* SIDEBAR */}
        <aside className="tm-sidebar">
          <div className="tm-logo">
            <div className="tm-logo-icon">E</div>

            <div>
              <h2>ERP System</h2>
              <span>PROJECT MANAGEMENT</span>
            </div>
          </div>

          <p className="tm-nav-title">Workspace</p>

          <nav className="tm-nav">
            <button
              className={`tm-nav-button ${
                activeTab === "Dashboard" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Dashboard")}
            >
              <span className="tm-nav-icon">⌂</span>
              Dashboard
            </button>

            <button
              className={`tm-nav-button ${
                activeTab === "My Tasks" ? "active" : ""
              }`}
              onClick={() => setActiveTab("My Tasks")}
            >
              <span className="tm-nav-icon">✓</span>
              My Tasks
            </button>

            <button
              className={`tm-nav-button ${
                activeTab === "Team Chat" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Team Chat")}
            >
              <span className="tm-nav-icon">◌</span>
              Team Chat
            </button>

            <button
              className={`tm-nav-button ${
                activeTab === "Reports" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Reports")}
            >
              <span className="tm-nav-icon">▤</span>
              My Reports
            </button>

            <button
              className={`tm-nav-button ${
                activeTab === "Notifications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Notifications")}
            >
              <span className="tm-nav-icon">♢</span>
              Notifications
            </button>
          </nav>

          <div className="tm-project-box">
            <small>SELECTED PROJECT</small>

            <h4>ERP Management System</h4>

            <p>Project Alpha</p>

            <span className="tm-project-role">
              Team Member
            </span>
          </div>
        </aside>

        {/* MAIN */}
        <main className="tm-main">
          {/* TOP BAR */}
          <header className="tm-topbar">
            <div className="tm-breadcrumb">
              Workspace / <strong>{activeTab}</strong>
            </div>

            <div className="tm-top-actions">
              <button
                className="tm-notification"
                onClick={() => setActiveTab("Notifications")}
                title="Notifications"
              >
                ♢
                <span className="tm-notification-badge">
                  3
                </span>
              </button>

              <div className="tm-profile-wrapper">
                <button
                  className="tm-profile-button"
                  onClick={() =>
                    setShowProfileMenu(!showProfileMenu)
                  }
                >
                  <div className="tm-avatar">VP</div>

                  <div className="tm-profile-info">
                    <strong>VPV</strong>
                    <span>Team Member</span>
                  </div>

                  <span>⌄</span>
                </button>

                {showProfileMenu && (
                  <div className="tm-profile-menu">
                    <button
                      onClick={() => {
                        setActiveTab("Profile");
                        setShowProfileMenu(false);
                      }}
                    >
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        alert("Logout functionality will be connected to the backend.");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <section className="tm-content">
            {activeTab === "Dashboard" && (
              <>
                <div className="tm-page-heading">
                  <div>
                    <h1>Team Member Dashboard</h1>
                    <p>
                      View your tasks, deadlines, progress and
                      team activities.
                    </p>
                  </div>

                  <select
                    className="tm-project-selector"
                    defaultValue="ERP Management System"
                  >
                    <option>ERP Management System</option>
                  </select>
                </div>

                {/* STATS */}
                <div className="tm-stats">
                  <div className="tm-stat-card">
                    <div className="tm-stat-top">
                      <span className="tm-stat-label">
                        Total Tasks
                      </span>
                      <div className="tm-stat-icon">✓</div>
                    </div>

                    <div className="tm-stat-value">
                      {tasks.length}
                    </div>

                    <div className="tm-stat-note">
                      Tasks assigned to you
                    </div>
                  </div>

                  <div className="tm-stat-card">
                    <div className="tm-stat-top">
                      <span className="tm-stat-label">
                        In Progress
                      </span>
                      <div className="tm-stat-icon">◷</div>
                    </div>

                    <div className="tm-stat-value">
                      {inProgressTasks}
                    </div>

                    <div className="tm-stat-note">
                      Currently working on
                    </div>
                  </div>

                  <div className="tm-stat-card">
                    <div className="tm-stat-top">
                      <span className="tm-stat-label">
                        Pending
                      </span>
                      <div className="tm-stat-icon">○</div>
                    </div>

                    <div className="tm-stat-value">
                      {pendingTasks}
                    </div>

                    <div className="tm-stat-note">
                      Tasks waiting to start
                    </div>
                  </div>

                  <div className="tm-stat-card">
                    <div className="tm-stat-top">
                      <span className="tm-stat-label">
                        Completed
                      </span>
                      <div className="tm-stat-icon">★</div>
                    </div>

                    <div className="tm-stat-value">
                      {completedTasks}
                    </div>

                    <div className="tm-stat-note">
                      Successfully completed
                    </div>
                  </div>
                </div>

                <div className="tm-grid">
                  <div>
                    {/* TASKS */}
                    <div className="tm-card">
                      <div className="tm-card-header">
                        <div>
                          <h3>My Tasks</h3>
                          <p>
                            Tasks assigned by your Team Lead
                          </p>
                        </div>

                        <button
                          className="tm-view-all"
                          onClick={() =>
                            setActiveTab("My Tasks")
                          }
                        >
                          View All
                        </button>
                      </div>

                      <div className="tm-filter-buttons">
                        {[
                          "All",
                          "Pending",
                          "In Progress",
                          "Completed",
                        ].map((filter) => (
                          <button
                            key={filter}
                            className={`tm-filter-button ${
                              taskFilter === filter
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setTaskFilter(filter)
                            }
                          >
                            {filter}
                          </button>
                        ))}
                      </div>

                      <div
                        className="tm-task-list"
                        style={{ marginTop: "17px" }}
                      >
                        {filteredTasks.map((task) => (
                          <div
                            className="tm-task"
                            key={task.id}
                          >
                            <div className="tm-task-main">
                              <div>
                                <h4 className="tm-task-title">
                                  {task.title}
                                </h4>

                                <div className="tm-task-project">
                                  {task.project}
                                </div>
                              </div>

                              <div className="tm-task-meta">
                                <span
                                  className={`tm-badge ${
                                    task.priority === "High"
                                      ? "tm-priority-high"
                                      : task.priority ===
                                        "Medium"
                                      ? "tm-priority-medium"
                                      : "tm-priority-low"
                                  }`}
                                >
                                  {task.priority}
                                </span>

                                <span
                                  className={`tm-badge ${
                                    task.status === "Completed"
                                      ? "tm-status-completed"
                                      : task.status ===
                                        "In Progress"
                                      ? "tm-status-progress"
                                      : "tm-status-pending"
                                  }`}
                                >
                                  {task.status}
                                </span>
                              </div>
                            </div>

                            <div className="tm-task-bottom">
                              <div className="tm-progress-track">
                                <div
                                  className="tm-progress-bar"
                                  style={{
                                    width: `${task.progress}%`,
                                  }}
                                ></div>
                              </div>

                              <span className="tm-progress-text">
                                {task.progress}%
                              </span>

                              <span className="tm-deadline">
                                Due: {task.deadline}
                              </span>

                              <select
                                className="tm-task-status-select"
                                value={task.status}
                                onChange={(event) =>
                                  updateTaskStatus(
                                    task.id,
                                    event.target.value
                                  )
                                }
                              >
                                <option value="Pending">
                                  Pending
                                </option>
                                <option value="In Progress">
                                  In Progress
                                </option>
                                <option value="Completed">
                                  Completed
                                </option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* WORK UPDATE */}
                    <div className="tm-card tm-work-update">
                      <div className="tm-card-header">
                        <div>
                          <h3>Update Your Work</h3>
                          <p>
                            Share what you have completed,
                            what you are working on, and any
                            blockers.
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleWorkUpdate}>
                        <textarea
                          value={newWorkUpdate}
                          onChange={(event) =>
                            setNewWorkUpdate(event.target.value)
                          }
                          placeholder="Example: Completed the login page UI. Currently working on API integration. No blockers."
                        ></textarea>

                        <div className="tm-work-update-footer">
                          <button
                            type="submit"
                            className="tm-submit-button"
                          >
                            Submit Work Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div>
                    {/* PROJECT PROGRESS */}
                    <div className="tm-card">
                      <div className="tm-card-header">
                        <div>
                          <h3>My Progress</h3>
                          <p>Current project progress</p>
                        </div>
                      </div>

                      <div className="tm-overall-progress">
                        <div className="tm-circle">
                          <div className="tm-circle-inner">
                            <strong>
                              {overallProgress}%
                            </strong>
                            <span>Overall Progress</span>
                          </div>
                        </div>

                        <div className="tm-progress-summary">
                          <div className="tm-summary-item">
                            <strong>
                              {completedTasks}
                            </strong>
                            <span>Completed</span>
                          </div>

                          <div className="tm-summary-item">
                            <strong>
                              {inProgressTasks}
                            </strong>
                            <span>Working</span>
                          </div>

                          <div className="tm-summary-item">
                            <strong>
                              {pendingTasks}
                            </strong>
                            <span>Pending</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NOTIFICATIONS */}
                    <div className="tm-card">
                      <div className="tm-card-header">
                        <div>
                          <h3>Notifications</h3>
                          <p>Recent project updates</p>
                        </div>

                        <button
                          className="tm-view-all"
                          onClick={() =>
                            setActiveTab("Notifications")
                          }
                        >
                          View All
                        </button>
                      </div>

                      <div className="tm-notification-list">
                        <div className="tm-notification-item">
                          <div className="tm-notification-icon">
                            ✓
                          </div>

                          <div className="tm-notification-text">
                            <p>
                              New task assigned by Team Lead.
                            </p>
                            <span>15 minutes ago</span>
                          </div>
                        </div>

                        <div className="tm-notification-item">
                          <div className="tm-notification-icon">
                            !
                          </div>

                          <div className="tm-notification-text">
                            <p>
                              Login page deadline is
                              approaching.
                            </p>
                            <span>1 hour ago</span>
                          </div>
                        </div>

                        <div className="tm-notification-item">
                          <div className="tm-notification-icon">
                            ◌
                          </div>

                          <div className="tm-notification-text">
                            <p>
                              Team Lead requested a status
                              update.
                            </p>
                            <span>2 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TEAM CHAT */}
                    <div className="tm-card">
                      <div className="tm-card-header">
                        <div>
                          <h3>Team Chat</h3>
                          <p>
                            Communication within your team
                          </p>
                        </div>
                      </div>

                      <div className="tm-chat-list">
                        {messages.map((message) => (
                          <div
                            className="tm-message"
                            key={message.id}
                          >
                            <div className="tm-message-avatar">
                              {message.sender
                                .substring(0, 2)
                                .toUpperCase()}
                            </div>

                            <div className="tm-message-content">
                              <div className="tm-message-top">
                                <strong>
                                  {message.sender}
                                </strong>

                                <span>
                                  {message.time}
                                </span>
                              </div>

                              <p>{message.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        className="tm-chat-button"
                        onClick={() => setActiveTab("Team Chat")}
                      >
                        Open Team Chat
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* MY TASKS */}
            {activeTab === "My Tasks" && (
              <>
                <h1 className="tm-section-title">
                  My Tasks
                </h1>

                <p className="tm-section-description">
                  View and update the tasks assigned to you
                  by your Team Lead.
                </p>

                <div className="tm-card">
                  <div className="tm-filter-buttons">
                    {[
                      "All",
                      "Pending",
                      "In Progress",
                      "Completed",
                    ].map((filter) => (
                      <button
                        key={filter}
                        className={`tm-filter-button ${
                          taskFilter === filter ? "active" : ""
                        }`}
                        onClick={() =>
                          setTaskFilter(filter)
                        }
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div
                    className="tm-task-list"
                    style={{ marginTop: "20px" }}
                  >
                    {filteredTasks.map((task) => (
                      <div className="tm-task" key={task.id}>
                        <div className="tm-task-main">
                          <div>
                            <h4 className="tm-task-title">
                              {task.title}
                            </h4>

                            <div className="tm-task-project">
                              {task.project}
                            </div>
                          </div>

                          <div className="tm-task-meta">
                            <span
                              className={`tm-badge ${
                                task.priority === "High"
                                  ? "tm-priority-high"
                                  : task.priority === "Medium"
                                  ? "tm-priority-medium"
                                  : "tm-priority-low"
                              }`}
                            >
                              {task.priority}
                            </span>

                            <span
                              className={`tm-badge ${
                                task.status === "Completed"
                                  ? "tm-status-completed"
                                  : task.status ===
                                    "In Progress"
                                  ? "tm-status-progress"
                                  : "tm-status-pending"
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                        </div>

                        <div className="tm-task-bottom">
                          <div className="tm-progress-track">
                            <div
                              className="tm-progress-bar"
                              style={{
                                width: `${task.progress}%`,
                              }}
                            ></div>
                          </div>

                          <span className="tm-progress-text">
                            {task.progress}%
                          </span>

                          <span className="tm-deadline">
                            Due: {task.deadline}
                          </span>

                          <select
                            className="tm-task-status-select"
                            value={task.status}
                            onChange={(event) =>
                              updateTaskStatus(
                                task.id,
                                event.target.value
                              )
                            }
                          >
                            <option value="Pending">
                              Pending
                            </option>
                            <option value="In Progress">
                              In Progress
                            </option>
                            <option value="Completed">
                              Completed
                            </option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TEAM CHAT */}
            {activeTab === "Team Chat" && (
              <>
                <h1 className="tm-section-title">
                  Team Chat
                </h1>

                <p className="tm-section-description">
                  Chat with your Team Lead and members of your
                  team. This chat is strictly limited to your
                  project team.
                </p>

                <div className="tm-card">
                  <div className="tm-card-header">
                    <div>
                      <h3>Project Alpha Team</h3>
                      <p>
                        Team Lead + Team Members
                      </p>
                    </div>
                  </div>

                  <div className="tm-chat-list">
                    {messages.map((message) => (
                      <div
                        className="tm-message"
                        key={message.id}
                      >
                        <div className="tm-message-avatar">
                          {message.sender
                            .substring(0, 2)
                            .toUpperCase()}
                        </div>

                        <div className="tm-message-content">
                          <div className="tm-message-top">
                            <strong>
                              {message.sender}
                            </strong>

                            <span>{message.time}</span>
                          </div>

                          <p>{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #dce1e8",
                        borderRadius: "7px",
                        outline: "none",
                        fontSize: "12px",
                      }}
                    />

                    <button
                      className="tm-submit-button"
                      style={{ marginTop: "10px" }}
                      onClick={() =>
                        alert("Chat API will be connected later.")
                      }
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* REPORTS */}
            {activeTab === "Reports" && (
              <>
                <h1 className="tm-section-title">
                  My Reports
                </h1>

                <p className="tm-section-description">
                  Submit and track your work reports for your
                  Team Lead.
                </p>

                <div className="tm-card">
                  <div className="tm-empty-state">
                    <div className="tm-empty-state-icon">
                      ▤
                    </div>

                    <h3>Work Reports</h3>

                    <p>
                      Your submitted reports will appear here.
                    </p>

                    <button
                      className="tm-submit-button"
                      style={{ marginTop: "15px" }}
                      onClick={() =>
                        alert(
                          "Report submission form will be connected next."
                        )
                      }
                    >
                      Submit New Report
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "Notifications" && (
              <>
                <h1 className="tm-section-title">
                  Notifications
                </h1>

                <p className="tm-section-description">
                  Stay updated with your tasks and team
                  activities.
                </p>

                <div className="tm-card">
                  <div className="tm-notification-list">
                    <div className="tm-notification-item">
                      <div className="tm-notification-icon">
                        ✓
                      </div>

                      <div className="tm-notification-text">
                        <p>
                          New task assigned by Team Lead.
                        </p>
                        <span>15 minutes ago</span>
                      </div>
                    </div>

                    <div className="tm-notification-item">
                      <div className="tm-notification-icon">
                        !
                      </div>

                      <div className="tm-notification-text">
                        <p>
                          Login page deadline is approaching.
                        </p>
                        <span>1 hour ago</span>
                      </div>
                    </div>

                    <div className="tm-notification-item">
                      <div className="tm-notification-icon">
                        ◌
                      </div>

                      <div className="tm-notification-text">
                        <p>
                          Team Lead requested a status update.
                        </p>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* PROFILE */}
            {activeTab === "Profile" && (
              <>
                <h1 className="tm-section-title">
                  My Profile
                </h1>

                <p className="tm-section-description">
                  View your Team Member account information.
                </p>

                <div className="tm-card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "18px",
                      paddingBottom: "20px",
                      borderBottom: "1px solid #edf0f4",
                    }}
                  >
                    <div
                      className="tm-avatar"
                      style={{
                        width: "70px",
                        height: "70px",
                        fontSize: "20px",
                      }}
                    >
                      VP
                    </div>

                    <div>
                      <h2
                        style={{
                          margin: 0,
                          fontSize: "20px",
                        }}
                      >
                        VPV
                      </h2>

                      <p
                        style={{
                          margin: "5px 0 0",
                          color: "#7b8495",
                          fontSize: "12px",
                        }}
                      >
                        Team Member
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",
                      gap: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <div>
                      <small
                        style={{
                          color: "#8a94a6",
                          fontSize: "10px",
                        }}
                      >
                        Name
                      </small>

                      <p
                        style={{
                          margin: "5px 0 0",
                          fontSize: "13px",
                        }}
                      >
                        VPV
                      </p>
                    </div>

                    <div>
                      <small
                        style={{
                          color: "#8a94a6",
                          fontSize: "10px",
                        }}
                      >
                        Role
                      </small>

                      <p
                        style={{
                          margin: "5px 0 0",
                          fontSize: "13px",
                        }}
                      >
                        Team Member
                      </p>
                    </div>

                    <div>
                      <small
                        style={{
                          color: "#8a94a6",
                          fontSize: "10px",
                        }}
                      >
                        Project
                      </small>

                      <p
                        style={{
                          margin: "5px 0 0",
                          fontSize: "13px",
                        }}
                      >
                        ERP Management System
                      </p>
                    </div>

                    <div>
                      <small
                        style={{
                          color: "#8a94a6",
                          fontSize: "10px",
                        }}
                      >
                        Account Status
                      </small>

                      <p
                        style={{
                          margin: "5px 0 0",
                          color: "#15803d",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;