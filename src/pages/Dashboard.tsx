import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select } from '../components/Form';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Portfolio, portfolioAPI } from '../api/portfolios';
import { Logo } from '../components/AuthLayout';
import { formatDate, getErrorMessage } from '../utils/helpers';

interface CreatePortfolioForm {
    name: string;
    client_name: string;
    base_currency: 'KES' | 'USD';
}

export const Dashboard: REACT.FC = () => {
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState ('');
    const [showCreateForm, setShowCreateForm] = useState(false);
     const [showEditForm, setShowEditForm] = useState(false);
     const [editingId, setEditingId] = useState <String | null>(null);
     const [form, setForm] = useState<CreatePortfolioForm>({
        name: '',
        client_name: '',
        base_currency: 'KES',
     });
     const [formErrors, setFormErrors] = useState <Record<string, string>>({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [deleteConfirm, setDeleteConfirm] = useState <string | null>(null);
      const [isDeleting, setIsDeleting] = useState(false);

      useEffect(() => {
        loadPortfolios();
      },[]);

      const loadPortfolios = async () => {
        setIsLoading(true);
        try{
            const response = await portfolioAPI.list();
            setPortfolios(response.data);
            setError('');

        }catch(err){
            setError(getErrorMessage(err));
        }finally{
            setIsLoading(false);
        }
      };


      const validateForm = () : boolean => {
        const errors: Record<string, string> = {};
        if(!form.name.trim()) errors.name = "Portfolio name is required";
        if(!form.client_name.trim()) errors.name = "Client name is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      };

}