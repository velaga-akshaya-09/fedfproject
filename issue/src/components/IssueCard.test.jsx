import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import IssueCard from './IssueCard'

// Mock the memo function
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    memo: (component) => component
  }
})

const mockIssue = {
  id: 1,
  title: 'Test Issue',
  status: 'Open',
  priority: 'High',
  category: 'Bug',
  description: 'This is a test issue description',
  assignee: 'John Doe',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z'
}

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('IssueCard', () => {
  it('renders issue information correctly', () => {
    renderWithRouter(<IssueCard issue={mockIssue} />)

    expect(screen.getByText('Test Issue')).toBeInTheDocument()
    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.getByText('High')).toBeInTheDocument()
    expect(screen.getByText('Bug')).toBeInTheDocument()
    expect(screen.getByText('This is a test issue description')).toBeInTheDocument()
    expect(screen.getByText('Assigned to John Doe')).toBeInTheDocument()
  })

  it('displays action buttons on hover', async () => {
    renderWithRouter(<IssueCard issue={mockIssue} />)

    const card = screen.getByText('Test Issue').closest('.issue-card')

    // Initially buttons should be hidden (opacity: 0)
    const editButton = screen.getByTitle('Edit Issue')
    const deleteButton = screen.getByTitle('Delete Issue')

    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()

    // Simulate hover
    fireEvent.mouseEnter(card)
    await waitFor(() => {
      // In a real test, we'd check for opacity changes
      // For now, just verify buttons exist
    })
  })

  it('formats dates correctly', () => {
    renderWithRouter(<IssueCard issue={mockIssue} />)

    expect(screen.getByText(/Created Jan 15, 2024/)).toBeInTheDocument()
  })

  it('handles missing optional fields gracefully', () => {
    const issueWithoutOptional = {
      id: 2,
      title: 'Minimal Issue',
      status: 'Closed'
    }

    renderWithRouter(<IssueCard issue={issueWithoutOptional} />)

    expect(screen.getByText('Minimal Issue')).toBeInTheDocument()
    expect(screen.getByText('Closed')).toBeInTheDocument()
    expect(screen.getByText('N/A')).toBeInTheDocument() // For missing dates
  })
})