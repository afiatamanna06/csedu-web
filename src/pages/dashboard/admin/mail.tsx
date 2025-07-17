import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Mail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function MailInbox() {
  const [mails, setMails] = useState<Mail[]>([]);

  useEffect(() => {
    // This would be a real API call in production
    const fetchMails = async () => {
      const res = await fetch("/api/mails");
      const data = await res.json();
      setMails(data);
    };
    fetchMails();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#13274C] mb-4">Inbox</h2>
      {mails.length === 0 ? (
        <p className="text-gray-600">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {mails.map((mail) => (
            <Card key={mail.id} className="hover:shadow-md transition duration-200">
              <CardHeader>
                <CardTitle className="text-lg text-[#13274C]">
                  {mail.subject} <span className="text-sm text-gray-500 ml-2">({new Date(mail.timestamp).toLocaleString()})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-2">
                  From: {mail.firstName} {mail.lastName} ({mail.email})
                </div>
                <Separator className="mb-2" />
                <p className="text-gray-700 whitespace-pre-line">{mail.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}