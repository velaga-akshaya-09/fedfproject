import { createContext, useState, useEffect, useCallback } from "react";
import { fetchIssues, createIssue, updateIssue, deleteIssue } from "../services/api";

export const IssueContext = createContext();

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadIssues = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchIssues();
      setIssues(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading issues:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const addIssue = useCallback(async (issueData) => {
    try {
      setError(null);
      const newIssue = await createIssue(issueData);
      setIssues(prev => [newIssue, ...prev]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const updateIssueById = useCallback(async (id, updates) => {
    try {
      setError(null);
      const updatedIssue = await updateIssue(id, updates);
      setIssues(prev => prev.map(issue =>
        issue.id === id ? { ...issue, ...updatedIssue } : issue
      ));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const removeIssue = useCallback(async (id) => {
    try {
      setError(null);
      await deleteIssue(id);
      setIssues(prev => prev.filter(issue => issue.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const getIssueById = useCallback((id) => {
    return issues.find(issue => issue.id === id);
  }, [issues]);

  const getIssuesByStatus = useCallback((status) => {
    return issues.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
  }, [issues]);

  const getIssuesByAssignee = useCallback((assignee) => {
    return issues.filter(issue => issue.assignee === assignee);
  }, [issues]);

  const value = {
    issues,
    loading,
    error,
    addIssue,
    updateIssue: updateIssueById,
    removeIssue,
    getIssueById,
    getIssuesByStatus,
    getIssuesByAssignee,
    refreshIssues: loadIssues
  };

  return (
    <IssueContext.Provider value={value}>
      {children}
    </IssueContext.Provider>
  );
};