import { User } from "lucide-react";

interface ReportPostComponentProps {
  user_name: string;
  title: string;
  description: string;
  images?: string[];
}

export default function ReportPostComponent(props: ReportPostComponentProps) {
  console.log(props.images);
  return (
    <div className="max-w-md mx-auto bg-white  shadow-md overflow-hidden my-6 border-b">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <div className="bg-gray-200 p-2 rounded-full">
          <User className="w-5 h-5 text-gray-600" />
        </div>
        <h2 className="ml-3 font-semibold text-gray-800">{props.user_name}</h2>
      </div>

      {/* Images */}
      {props.images && props.images.length > 0 && (
        <div className="w-full">
          {props.images.length === 1 ? (
            <img
              src={props.images[0]}
              alt="Post"
              className="w-full object-cover max-h-[500px]"
            />
          ) : (
            <div className="flex overflow-x-scroll gap-2 p-2">
              {props.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`image-${idx}`}
                  className="w-64 h-64 object-cover rounded-md flex-shrink-0"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-3">
        <h3 className="text-md font-semibold mb-1">{props.title}</h3>
        <p className="text-sm text-gray-700">{props.description}</p>
      </div>
    </div>
  );
}
