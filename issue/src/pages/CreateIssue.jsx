import { useState, useContext } from "react";
import { IssueContext } from "../context/IssueContext";
import { useNavigate } from "react-router-dom";

const CreateIssue = () => {
  const { addIssue } = useContext(IssueContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
    category: "Bug",
    assignee: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      addIssue({
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating issue:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-container">
        <div className="create-issue-form">
          <div className="form-header">
            <h2 className="form-title">Create New Issue</h2>
            <p className="form-subtitle">Fill in the details below to create a new issue for tracking</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Issue Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="Enter a clear, descriptive title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                rows="4"
                placeholder="Provide detailed information about the issue..."
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                style={{ resize: 'vertical', minHeight: '100px' }}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                  <option value="Enhancement">Enhancement</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="assignee">Assignee</label>
                <input
                  type="text"
                  id="assignee"
                  name="assignee"
                  className="form-input"
                  placeholder="Assign to team member"
                  value={formData.assignee}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !formData.title.trim()}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner" style={{ marginRight: '0.5rem' }}></span>
                    Creating...
                  </>
                ) : (
                  'Create Issue'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIssue;