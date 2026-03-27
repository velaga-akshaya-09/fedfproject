// Mock API service for IssueTracker
// In a real application, these would be actual API calls

export const fetchIssues = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Login page not responsive on mobile devices",
          status: "Open",
          priority: "High",
          category: "Bug",
          description: "The login form elements are not properly aligned on screens smaller than 768px. The submit button overlaps with the input fields.",
          assignee: "Sarah Johnson",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Add dark mode toggle to dashboard",
          status: "In Progress",
          priority: "Medium",
          category: "Feature",
          description: "Implement a dark mode theme toggle in the dashboard header. Should persist user preference in localStorage.",
          assignee: "Michael Chen",
          createdAt: "2024-01-14T14:20:00Z",
          updatedAt: "2024-01-16T09:15:00Z"
        },
        {
          id: 3,
          title: "API rate limiting causing 429 errors",
          status: "Closed",
          priority: "Critical",
          category: "Bug",
          description: "Users are experiencing 429 Too Many Requests errors when performing bulk operations. Need to implement proper rate limiting.",
          assignee: "David Kim",
          createdAt: "2024-01-10T16:45:00Z",
          updatedAt: "2024-01-12T11:30:00Z"
        },
        {
          id: 4,
          title: "Implement user profile page",
          status: "Open",
          priority: "Low",
          category: "Feature",
          description: "Create a user profile page where users can update their information, change password, and manage notification preferences.",
          assignee: "",
          createdAt: "2024-01-13T08:00:00Z",
          updatedAt: "2024-01-13T08:00:00Z"
        },
        {
          id: 5,
          title: "Database query optimization needed",
          status: "In Progress",
          priority: "High",
          category: "Enhancement",
          description: "Several database queries are running slow, especially on the issues listing page. Need to add proper indexes and optimize queries.",
          assignee: "Emily Rodriguez",
          createdAt: "2024-01-12T13:15:00Z",
          updatedAt: "2024-01-17T10:45:00Z"
        }
      ]);
    }, 1000);
  });
};

export const createIssue = (issueData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional failure
      if (Math.random() < 0.1) {
        reject(new Error("Failed to create issue. Please try again."));
        return;
      }

      const newIssue = {
        ...issueData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      resolve(newIssue);
    }, 800);
  });
};

export const updateIssue = (id, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.05) {
        reject(new Error("Failed to update issue. Please try again."));
        return;
      }

      resolve({
        ...updates,
        id,
        updatedAt: new Date().toISOString()
      });
    }, 600);
  });
};

export const deleteIssue = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.03) {
        reject(new Error("Failed to delete issue. Please try again."));
        return;
      }

      resolve({ id });
    }, 500);
  });
};

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple mock authentication
      if (email && password) {
        resolve({
          id: 1,
          email,
          name: email.split('@')[0],
          token: 'mock-jwt-token-' + Date.now()
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists (mock)
      if (userData.email === 'existing@example.com') {
        reject(new Error("User already exists"));
        return;
      }

      resolve({
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      });
    }, 1200);
  });
};