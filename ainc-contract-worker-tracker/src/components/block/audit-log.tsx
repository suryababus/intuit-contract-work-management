import { useAuditLogForServiceContract } from "@/api/audit-log";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";
import { FullPageLoader } from "../ui/full-page-loader";

type AuditLogProps = {
  id: string;
};

export const AuditLog = ({ id }: AuditLogProps) => {
  const { data: auditLog, isLoading } = useAuditLogForServiceContract(id);

  if (isLoading) return <FullPageLoader />;

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auditLog?.data?.map((log) => (
            <div className="flex items-start gap-4" key={log.id}>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{log.activity}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Performed by:{" "}
                  <span className="font-medium">{log.performedBy.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
