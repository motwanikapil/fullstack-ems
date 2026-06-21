import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEPARTMENTS } from "../assets/assets.jsx";
import { Loader2Icon } from "lucide-react";

export interface Employee {
  firstName: string;
  lastName: string;
  phone: string;
  joinDate: string;
  bio?: string;
  department?: string;
  position?: string;
  basicSalary?: number;
  allowances?: number;
  deductions?: number;
  employmentStatus?: "ACTIVE" | "INACTIVE";
  email: string;
}

interface EmployeeFormProps {
  initialData?: Employee | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const EmployeeForm = ({
  initialData,
  onSuccess,
  onCancel,
}: EmployeeFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl animate-fade-in"
    >
      {/* personal information */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2">First name</label>
            <input
              type="text"
              name="firstName"
              required
              defaultValue={initialData?.firstName}
            />
          </div>
          <div>
            <label className="block mb-2">Last name</label>
            <input
              type="text"
              name="lastName"
              required
              defaultValue={initialData?.lastName}
            />
          </div>
          <div>
            <label className="block mb-2">Phone number</label>
            <input
              type="tel"
              name="phone"
              required
              defaultValue={initialData?.phone}
            />
          </div>
          <div>
            <label className="block mb-2">Join Date</label>
            <input
              type="date"
              name="joinDate"
              required
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData?.joinDate).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Bio (Optional)</label>
            <textarea
              name="bio"
              defaultValue={initialData?.bio}
              rows={3}
              className="resize-none"
              placeholder="Brief description..."
            />
          </div>
        </div>
      </div>

      {/* employment details */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Employment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2">Department</label>
            <select
              name="department"
              id="department"
              defaultValue={initialData?.department || ""}
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Position</label>
            <input
              type="text"
              name="position"
              required
              defaultValue={initialData?.position!}
            />
          </div>
          <div>
            <label htmlFor="">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              required
              min={0}
              defaultValue={initialData?.basicSalary || 0}
            />
          </div>
          <div>
            <label htmlFor="">Allowances</label>
            <input
              type="number"
              name="allowances"
              required
              min={0}
              step={0.01}
              defaultValue={initialData?.allowances || 0}
            />
          </div>
          <div>
            <label htmlFor="">Deductions</label>
            <input
              type="number"
              name="deductions"
              required
              min={0}
              step={0.01}
              defaultValue={initialData?.deductions || 0}
            />
          </div>
          {isEditMode && (
            <div>
              <label htmlFor="">Status</label>
              <select
                name="employmentStatus"
                required
                defaultValue={initialData?.employmentStatus}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {/* account setup */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Account Setup
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="sm:col-span-2">
            <label className="block mb-2">Work Email</label>
            <input
              type="email"
              name="email"
              required
              defaultValue={initialData?.email}
            />
          </div>
          {!isEditMode && (
            <div className="sm:col-span-2">
              <label className="block mb-2">Temporary Password</label>
              <input type="password" name="password" required />
            </div>
          )}
          {isEditMode && (
            <div className="sm:col-span-2">
              <label className="block mb-2">Change Password (Optional)</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Leave blank to keep current"
              />
            </div>
          )}
          <div className="sm:col-span-2">
            <label className="block mb-2">System role</label>
            <select
              name="role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center justify-center"
          disabled={loading}
        >
          {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};
export default EmployeeForm;
