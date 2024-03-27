import axios from 'axios';
import { API_KEY, API_ENDPOINT } from '../constants.js';

export async function getFilteredResponses(formId, filters) {
  const url = `${API_ENDPOINT}/${formId}/submissions`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const filteredResponses = response.data.responses.filter((response) => {
      return filters.every((filter) => {
        const question = response.questions.find((q) => q.id === filter.id);
        if (!question) return false;

        switch (filter.condition) {
          case 'equals':
            return question.value === filter.value;
          case 'does_not_equal':
            return question.value !== filter.value;
          case 'greater_than':
            return new Date(question.value) > new Date(filter.value);
          case 'less_than':
            return new Date(question.value) < new Date(filter.value);
          default:
            return false;
        }
      });
    });

    response.data.responses = filteredResponses;
    response.data.totalResponses = filteredResponses.length;
    response.data.pageCount = 1;

    return filteredResponses;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch responses from Fillout.com API');
  }
}
