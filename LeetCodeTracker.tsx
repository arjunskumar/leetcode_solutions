"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, RotateCcw, Brain, TrendingUp, Calendar, CheckCircle, XCircle, Timer, BarChart } from 'lucide-react';

// Date formatting function to ensure consistent format between server and client
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Initial sample data
// Constants for difficulty colors
const DIFFICULTY_STYLES = {
  easy: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-200'
  },
  medium: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-200'
  },
  hard: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    border: 'border-rose-200'
  }
};

const initialProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    personalDifficulty: 2,
    solved: false,
    attempts: [],
    tags: ["Array", "Hash Table"],
    conceptsUsed: ["Hash Map", "Two Pointer Technique"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    solutions: {
      python: `def twoSum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      javascript: `const twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`
    },
    similarProblems: [
      { id: 15, title: "3Sum" },
      { id: 18, title: "4Sum" }
    ],
    nextReviewDate: "2024-01-20",
    studyNotes: "",
    commonMistakes: [
      "Forgetting to handle duplicate numbers",
      "Not considering edge cases with zero"
    ],
    edgeCases: [
      "Empty array",
      "No valid solution",
      "Multiple valid solutions"
    ]
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
    personalDifficulty: 3,
    solved: false,
    attempts: [],
    tags: ["Linked List", "Math", "Recursion"],
    conceptsUsed: ["Linked List", "Elementary Math"],
    timeComplexity: "O(max(n,m))",
    spaceComplexity: "O(max(n,m))",
    problemStatement: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
    solutions: {
      python: `def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    
    while l1 or l2 or carry:
        x = l1.val if l1 else 0
        y = l2.val if l2 else 0
        
        total = x + y + carry
        carry = total // 10
        curr.next = ListNode(total % 10)
        
        curr = curr.next
        if l1: l1 = l1.next
        if l2: l2 = l2.next
            
    return dummy.next`,
      javascript: `var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        let x = l1 ? l1.val : 0;
        let y = l2 ? l2.val : 0;
        
        let total = x + y + carry;
        carry = Math.floor(total / 10);
        curr.next = new ListNode(total % 10);
        
        curr = curr.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
};`
    },
    similarProblems: [
      { id: 445, title: "Add Two Numbers II" }
    ],
    nextReviewDate: "2024-01-21",
    studyNotes: "",
    commonMistakes: [
      "Not handling different length lists",
      "Forgetting about carry"
    ],
    edgeCases: [
      "Lists of different lengths",
      "Carry over at the end",
      "One empty list"
    ]
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    personalDifficulty: 4,
    solved: false,
    attempts: [],
    tags: ["String", "Sliding Window", "Hash Table"],
    conceptsUsed: ["Sliding Window", "Hash Map"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m,n))",
    problemStatement: "Given a string s, find the length of the longest substring without repeating characters.",
    solutions: {
      python: `def lengthOfLongestSubstring(self, s: str) -> int:
    chars = {}
    left = max_length = 0
    
    for right in range(len(s)):
        if s[right] in chars and chars[s[right]] >= left:
            left = chars[s[right]] + 1
        else:
            max_length = max(max_length, right - left + 1)
        chars[s[right]] = right
    
    return max_length`,
      javascript: `var lengthOfLongestSubstring = function(s) {
    const chars = new Map();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (chars.has(s[right]) && chars.get(s[right]) >= left) {
            left = chars.get(s[right]) + 1;
        } else {
            maxLength = Math.max(maxLength, right - left + 1);
        }
        chars.set(s[right], right);
    }
    
    return maxLength;
};`
    },
    similarProblems: [
      { id: 159, title: "Longest Substring with At Most Two Distinct Characters" }
    ],
    nextReviewDate: "2024-01-22",
    studyNotes: "",
    commonMistakes: [
      "Not updating the window correctly",
      "Incorrect handling of repeated characters"
    ],
    edgeCases: [
      "Empty string",
      "String with all same characters",
      "No repeating characters"
    ]
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    personalDifficulty: 5,
    solved: false,
    attempts: [],
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    conceptsUsed: ["Binary Search", "Array Partitioning"],
    timeComplexity: "O(log(min(n,m)))",
    spaceComplexity: "O(1)",
    problemStatement: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    solutions: {
      python: `def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    x, y = len(nums1), len(nums2)
    low, high = 0, x

    while low <= high:
        partitionX = (low + high) // 2
        partitionY = (x + y + 1) // 2 - partitionX

        maxLeftX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
        minRightX = float('inf') if partitionX == x else nums1[partitionX]
        
        maxLeftY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
        minRightY = float('inf') if partitionY == y else nums2[partitionY]

        if maxLeftX <= minRightY and maxLeftY <= minRightX:
            if (x + y) % 2 == 0:
                return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2
            else:
                return max(maxLeftX, maxLeftY)
        elif maxLeftX > minRightY:
            high = partitionX - 1
        else:
            low = partitionX + 1`,
      javascript: `var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const x = nums1.length;
    const y = nums2.length;
    let low = 0;
    let high = x;

    while (low <= high) {
        const partitionX = Math.floor((low + high) / 2);
        const partitionY = Math.floor((x + y + 1) / 2) - partitionX;

        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === x ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === y ? Infinity : nums2[partitionY];

        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((x + y) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + 
                        Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }
};`
    },
    similarProblems: [
      { id: 295, title: "Find Median from Data Stream" }
    ],
    nextReviewDate: "2024-01-23",
    studyNotes: "",
    commonMistakes: [
      "Not handling different array lengths",
      "Incorrect partition calculation",
      "Not considering edge cases"
    ],
    edgeCases: [
      "Arrays of different lengths",
      "Empty arrays",
      "Single element arrays"
    ]
  },
  {
    id: 5,
    title: "Two Sum",
    difficulty: "easy",
    personalDifficulty: 2,
    solved: true,
    attempts: [
      {
        date: "2024-01-13",
        timeToSolve: 15,
        passed: true,
        notes: "Used hash map for O(n) solution. Remember to consider edge cases."
      }
    ],
    tags: ["Array", "Hash Table"],
    conceptsUsed: ["Hash Map", "Two Pointer Technique"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    solutions: {
      python: `def twoSum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      javascript: `const twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`
    },
    similarProblems: [
      { id: 15, title: "3Sum" },
      { id: 18, title: "4Sum" }
    ],
    nextReviewDate: "2024-01-20",
    studyNotes: "Key insight: Using hash map trades space for time complexity improvement",
    commonMistakes: [
      "Forgetting to handle duplicate numbers",
      "Not considering edge cases with zero"
    ],
    edgeCases: [
      "Empty array",
      "No valid solution",
      "Multiple valid solutions"
    ]
  },
  // Add more sample problems here
];

const LeetCodeTracker = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [problems, setProblems] = useState(initialProblems);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Timer functionality
  useEffect(() => {
    let interval;
    if (activeTimer !== null) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const startTimer = (problemId) => {
    setActiveTimer(problemId);
    setTimerSeconds(0);
  };

  const stopTimer = (problemId, passed) => {
    if (activeTimer === problemId) {
      const minutes = Math.round(timerSeconds / 60);
      addAttempt(problemId, {
        date: new Date().toISOString().split('T')[0],
        timeToSolve: minutes,
        passed,
        notes: ""
      });
      setActiveTimer(null);
      setTimerSeconds(0);
    }
  };

  // Problem management functions
  const addAttempt = (problemId, attempt) => {
    setProblems(problems.map(problem =>
      problem.id === problemId
        ? {
          ...problem,
          attempts: [...problem.attempts, attempt],
          solved: attempt.passed || problem.solved
        }
        : problem
    ));
  };

  const updateDifficulty = (problemId, rating) => {
    setProblems(problems.map(problem =>
      problem.id === problemId
        ? { ...problem, personalDifficulty: rating }
        : problem
    ));
  };

  const updateNotes = (problemId, notes) => {
    setProblems(problems.map(problem =>
      problem.id === problemId
        ? { ...problem, studyNotes: notes }
        : problem
    ));
  };

  const calculateNextReviewDate = (problem) => {
    // Simple spaced repetition algorithm
    const lastAttempt = problem.attempts[problem.attempts.length - 1];
    if (!lastAttempt) return new Date();
    
    const lastAttemptDate = new Date(lastAttempt.date);
    const daysSinceLastAttempt = Math.floor((new Date() - lastAttemptDate) / (1000 * 60 * 60 * 24));
    
    let daysToAdd = 1;
    if (problem.attempts.length > 1) {
      const successfulAttempts = problem.attempts.filter(a => a.passed).length;
      daysToAdd = Math.min(30, Math.pow(2, successfulAttempts));
    }
    
    const nextDate = new Date(lastAttemptDate);
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    return nextDate;
  };

  // Stats calculation
  const getProgressStats = (difficulty = 'all') => {
    const filteredProblems = difficulty === 'all'
      ? problems
      : problems.filter(p => p.difficulty === difficulty);

    const total = filteredProblems.length;
    const solved = filteredProblems.filter(p => p.solved).length;
    const successRate = total ? Math.round((solved / total) * 100) : 0;
    const averageAttempts = total
      ? Math.round(filteredProblems.reduce((acc, p) => acc + p.attempts.length, 0) / total)
      : 0;

    return { total, solved, successRate, averageAttempts };
  };

  const filteredProblems = selectedDifficulty === 'all'
    ? problems
    : problems.filter(p => p.difficulty === selectedDifficulty);

  // Component for solution tabs
  const SolutionTabs = ({ solutions }) => {
    const [activeTab, setActiveTab] = useState('python');

    return (
      <div className="mt-4">
        <div className="flex gap-2 mb-4">
          {Object.keys(solutions).map(lang => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 rounded ${
                activeTab === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative">
          {Object.entries(solutions).map(([lang, code]) => (
            <div
              key={lang}
              className={`${activeTab === lang ? 'block' : 'hidden'}`}
            >
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Individual problem card component
  // Toggle problem solved status
  const toggleSolved = (problemId) => {
    setProblems(problems.map(problem => 
      problem.id === problemId 
        ? { 
            ...problem, 
            solved: !problem.solved,
            attempts: problem.attempts.length === 0 && !problem.solved 
              ? [{ 
                  date: new Date().toISOString().split('T')[0],
                  timeToSolve: 0,
                  passed: true,
                  notes: "Marked as completed"
                }] 
              : problem.attempts
          }
        : problem
    ));
  };

  const ProblemCard = ({ problem, toggleSolved }) => {
    const [showNotes, setShowNotes] = useState(false);
    const [showEdgeCases, setShowEdgeCases] = useState(false);
    
    const averageTimeToSolve = problem.attempts.length
      ? Math.round(problem.attempts.reduce((acc, curr) => acc + curr.timeToSolve, 0) / problem.attempts.length)
      : 0;

    const isActive = activeTimer === problem.id;
    const timerDisplay = isActive
      ? `${Math.floor(timerSeconds / 60)}:${String(timerSeconds % 60).padStart(2, '0')}`
      : '--:--';

    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl">
              {problem.id}. {problem.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{averageTimeToSolve} min avg</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Completion checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={problem.solved}
                onChange={() => toggleSolved(problem.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className={`text-sm ${problem.solved ? 'text-green-600' : 'text-gray-600'}`}>
                {problem.solved ? 'Completed' : 'Mark Complete'}
              </span>
            </label>
            
            {/* Timer controls */}
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span className="text-sm">{timerDisplay}</span>
              {!isActive ? (
                <button
                  onClick={() => startTimer(problem.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-full text-sm"
                >
                  Start
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => stopTimer(problem.id, true)}
                    className="px-3 py-1 bg-green-500 text-white rounded-full text-sm"
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => stopTimer(problem.id, false)}
                    className="px-3 py-1 bg-red-500 text-white rounded-full text-sm"
                  >
                    Fail
                  </button>
                </div>
              )}
            </div>

            {/* Personal difficulty rating */}
            <div className="flex items-center gap-2">
              <span className="text-sm">Difficulty:</span>
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => updateDifficulty(problem.id, rating)}
                  className={`w-6 h-6 rounded-full ${
                    problem.personalDifficulty >= rating
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* LeetCode difficulty */}
            <span className={`px-3 py-1 rounded-full text-sm border ${
              DIFFICULTY_STYLES[problem.difficulty].bg} ${
              DIFFICULTY_STYLES[problem.difficulty].text} ${
              DIFFICULTY_STYLES[problem.difficulty].border
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Tags and concepts */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">Concepts:</span>
                <div className="flex gap-2">
                  {problem.conceptsUsed.map(concept => (
                    <span key={concept} className="px-2 py-1 bg-purple-100 rounded-full text-sm">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Time: {problem.timeComplexity}</span>
                <span className="text-sm">Space: {problem.spaceComplexity}</span>
              </div>
            </div>

            {/* Problem statement */}
            <div className="text-gray-600">
              {problem.problemStatement}
            </div>

            {/* Edge cases and common mistakes */}
            <div>
              <button
                onClick={() => setShowEdgeCases(!showEdgeCases)}
                className="text-blue-600 hover:underline"
              >
                {showEdgeCases ? 'Hide' : 'Show'} Edge Cases & Common Mistakes
              </button>
              {showEdgeCases && (
                <div className="mt-2 space-y-2">
                  <div>
                    <h4 className="font-medium">Edge Cases:</h4>
                    <ul className="list-disc list-inside">
                      {problem.edgeCases.map((edge, i) => (
                        <li key={i} className="text-sm">{edge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Common Mistakes:</h4>
                    <ul className="list-disc list-inside">
                      {problem.commonMistakes.map((mistake, i) => (
                        <li key={i} className="text-sm">{mistake}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Similar problems */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Similar Problems:</span>
              <div className="flex gap-2">
                {problem.similarProblems.map(similar => (
                  <a
                    key={similar.id}
                    href={`#problem-${similar.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {similar.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Study notes */}
            <div>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-2 text-blue-600"
              >
                <RotateCcw className="w-4 h-4" />
                Study Notes & Review
              </button>
              {showNotes && (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={problem.studyNotes}
                    onChange={(e) => updateNotes(problem.id, e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    rows={4}
                    placeholder="Add your study notes here..."
                  />
                  <div className="text-sm text-gray-600">
                    Next review: {formatDate(problem.nextReviewDate)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Attempt History:</h4>
                    {problem.attempts.map((attempt, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span>{formatDate(attempt.date)}</span>
                        {attempt.passed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span>{attempt.timeToSolve} minutes</span>
                        {attempt.notes && (
                          <span className="text-gray-600">- {attempt.notes}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Solution tabs */}
            <SolutionTabs solutions={problem.solutions} />
          </div>
        </CardContent>
      </Card>
    );
  };

  // Stats calculation
  const stats = {
    all: getProgressStats(),
    easy: getProgressStats('easy'),
    medium: getProgressStats('medium'),
    hard: getProgressStats('hard')
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">LeetCode Progress Tracker</h1>
        
        {/* Difficulty filters */}
        <div className="flex gap-4 mb-6">
          {['all', 'easy', 'medium', 'hard'].map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedDifficulty === difficulty
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Problems</p>
                <p className="text-2xl font-bold">{stats[selectedDifficulty].total}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Solved</p>
                <p className="text-2xl font-bold">{stats[selectedDifficulty].solved}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">{stats[selectedDifficulty].successRate}%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Avg Attempts</p>
                <p className="text-2xl font-bold">{stats[selectedDifficulty].averageAttempts}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review schedule */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Problems Due for Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {problems
                .filter(p => new Date(p.nextReviewDate) <= new Date())
                .map(problem => (
                  <div key={problem.id} className="flex items-center justify-between">
                    <span>{problem.title}</span>
                    <span className="text-sm text-gray-600">
                      Due: {formatDate(problem.nextReviewDate)}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Problem list */}
      <div className="space-y-6">
        {filteredProblems.map(problem => (
          <ProblemCard 
            key={problem.id} 
            problem={problem}
            toggleSolved={toggleSolved}
          />
        ))}
      </div>
    </div>
  );
};

export default LeetCodeTracker;
