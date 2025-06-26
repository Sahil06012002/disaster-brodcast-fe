import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Modal } from "./modal";
import type { AddReportFormRef } from "../AddReportForm";
import AddReportForm from "../AddReportForm";
import ReportPostComponent from "../ReportPostComponent";
import apiClient from "@/services/ApiClient";
import { BLOB_URL } from "@/const";

interface ReportProps {
  disaster_id: number;
  title: string;
}

export interface DisasterReport {
  id: number;
  user_id: number;
  disaster_id: number;
  title: string;
  description: string;
  images?: string[];
  user_name: string;
}

export default function Reports(props: ReportProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<DisasterReport[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `reports?disaster_id=${props.disaster_id}`
        );
        console.log(response.data);
        setReports(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch disasters.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [props.disaster_id]);

  const addReportFormRef = useRef<AddReportFormRef>(null);

  const handleSubmit = async () => {
    if (addReportFormRef.current) {
      const isValid = await addReportFormRef.current?.submit();
      if (isValid) {
        setIsOpen(false);
        try {
          const response = await apiClient.get(
            `reports?disaster_id=${props.disaster_id}`
          );
          setReports(response.data.data);
        } catch (err) {
          console.error("Failed to refresh reports:", err);
        }
      }
    }
  };

  const addNewReport = (newReport: DisasterReport) => {
    setReports((prevReports) => [newReport, ...prevReports]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500 text-lg">
        Loading disasters...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {props.title}
            </h1>
            <p className="text-gray-600 mt-1">Community reports and updates</p>
          </div>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add Reports
          </Button>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onPositive={handleSubmit}
        title="Add Reports"
      >
        <AddReportForm
          ref={addReportFormRef}
          disaster_id={props.disaster_id}
          onReportAdded={addNewReport}
        />
      </Modal>

      <div>
        {Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report: DisasterReport) => {
            let imageLinks: string[] = [];
            if (report.images && report.images.length > 0) {
              imageLinks = report.images.map((image) => {
                return BLOB_URL + image;
              });
            }
            return (
              <ReportPostComponent
                key={report.id}
                user_name={report.user_name}
                title={report.title}
                description={report.description}
                images={imageLinks}
              />
            );
          })
        ) : (
          <div className="text-gray-500 text-center py-6">
            No reports found.
          </div>
        )}
      </div>
    </div>
  );
}
