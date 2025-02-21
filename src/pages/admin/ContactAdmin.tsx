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
      <div className="min-h-screen bg-black pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gold">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gold">Contact Submissions</h1>
          <p className="text-gold/60 mt-2">Manage and respond to contact form submissions</p>
        </div>

        <div className="bg-black rounded-lg shadow-lg overflow-hidden border border-gold/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gold/20">
              <thead>
                <tr className="bg-black">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gold uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gold uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/20">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gold/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gold">
                          {contact.first_name} {contact.last_name}
                        </div>
                        <div className="text-gold/60 flex items-center gap-2 mt-1">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-gold/60 flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gold/80 max-w-xs">
                        {contact.message.length > 100
                          ? `${contact.message.substring(0, 100)}...`
                          : contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          contact.status === 'new'
                            ? 'bg-gold/10 text-gold'
                            : contact.status === 'contacted'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-green-500/10 text-green-500'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gold/60">
                      {format(new Date(contact.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        {contact.status === 'new' && (
                          <button
                            onClick={() => updateStatus(contact.id, 'contacted')}
                            className="text-yellow-500 hover:text-yellow-400 transition-colors"
                            title="Mark as Contacted"
                          >
                            <Mail className="w-5 h-5" />
                          </button>
                        )}
                        {contact.status === 'contacted' && (
                          <button
                            onClick={() => updateStatus(contact.id, 'resolved')}
                            className="text-green-500 hover:text-green-400 transition-colors"
                            title="Mark as Resolved"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {contact.status === 'resolved' && (
                          <button
                            onClick={() => updateStatus(contact.id, 'new')}
                            className="text-red-500 hover:text-red-400 transition-colors"
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