import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { Mail, Phone, CheckCircle, XCircle } from 'lucide-react';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ContactAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await fetchContacts();
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gold">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gold mb-8">Contact Submissions</h1>

        <div className="bg-primary-light rounded-lg shadow overflow-hidden border border-gold/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gold/20">
              <thead>
                <tr className="bg-primary">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/20">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-primary/50">
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-offwhite">
                          {contact.first_name} {contact.last_name}
                        </div>
                        <div className="text-gold/60 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-gold/60 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-offwhite/80 max-w-xs">
                        {contact.message.length > 100
                          ? `${contact.message.substring(0, 100)}...`
                          : contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          contact.status === 'new'
                            ? 'bg-blue-100 text-blue-800'
                            : contact.status === 'contacted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-offwhite/60">
                      {format(new Date(contact.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {contact.status === 'new' && (
                          <button
                            onClick={() => updateStatus(contact.id, 'contacted')}
                            className="text-yellow-500 hover:text-yellow-600"
                            title="Mark as Contacted"
                          >
                            <Mail className="w-5 h-5" />
                          </button>
                        )}
                        {contact.status === 'contacted' && (
                          <button
                            onClick={() => updateStatus(contact.id, 'resolved')}
                            className="text-green-500 hover:text-green-600"
                            title="Mark as Resolved"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {contact.status === 'resolved' && (
                          <button
                            onClick={() => updateStatus(contact.id, 'new')}
                            className="text-red-500 hover:text-red-600"
                            title="Reopen"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}