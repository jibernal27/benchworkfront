import { parseError } from './helpers';

const transfromWithForm = body => {
  const bodyForm = new FormData();

  for (const [key, value] of Object.entries(body)) {
    if (value instanceof File) {
      bodyForm.append(key, value);
    } else if (value instanceof Array && value[0] instanceof File) {
      bodyForm.append(key, value[0]);
    } else {
      bodyForm.set(key, value);
    }
  }
  return bodyForm;
};

export default function(axios) {
  return {
    async appInit() {
      try {
        const response = await axios.get('app_init');
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
    async singUp(body) {
      try {
        const bodyForm = transfromWithForm(body);

        const response = await axios.post('signup', bodyForm);
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
    async getProfile() {
      try {
        const response = await axios.get('profile');
        return response;
      } catch (error) {
        return parseError(error);
      }
    },

    async logIn(body) {
      try {
        const response = await axios.post('token', body);
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
    async update(body) {
      try {
        const bodyForm = transfromWithForm(body);
        const response = await axios.post('profile', bodyForm);
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
    async listPlaces(page) {
      try {
        const response = await axios.get('places', { params: { page } });
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
    async createPlace(body) {
      try {
        const bodyForm = transfromWithForm(body);
        const response = await axios.post('places/', bodyForm);
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
    async deletePlace(id) {
      try {
        const response = await axios.delete(`places/${id}`);
        return response;
      } catch (error) {
        return parseError(error);
      }
    },

    async listFiles(page) {
      try {
        const response = await axios.get('files', { params: { page } });
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
    async createFile(body) {
      try {
        const bodyForm = transfromWithForm(body);
        const response = await axios.post('files/', bodyForm);
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
    async deleteFile(id) {
      try {
        const response = await axios.delete(`files/${id}`);
        return response;
      } catch (error) {
        return parseError(error);
      }
    },
  };
}
