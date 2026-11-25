import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/Form';
import { ErrorMessage} from '../components/Messages';
import { AuthLayout } from '../components/AuthLayout';
import { authAPI } from '../api/auth';
import { useAuthStore } from '../store/auth';
import { getErrorMessage, validateEmail } from '../utils/helpers';

export const