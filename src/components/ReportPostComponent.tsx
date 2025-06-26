import { User, MapPin, Clock } from "lucide-react";

interface ReportPostComponentProps {
  user_name: string;
  title: string;
  description: string;
  images?: string[];
  location?: string;
  timestamp?: string;
}

export default function ReportPostComponent(props: ReportPostComponentProps) {
  console.log(props.images);

  return (
    <div className="group max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 my-6 overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100/50">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-full shadow-sm">
            <User className="w-6 h-6 text-red-600" strokeWidth={2} />
          </div>
          <div className="ml-4">
            <h2 className="font-semibold text-gray-900 text-lg">
              {props.user_name}
            </h2>
            {props.location && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{props.location}</span>
              </div>
            )}
          </div>
        </div>

        {props.timestamp && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{props.timestamp}</span>
          </div>
        )}
      </div>

      {props.images && props.images.length > 0 && (
        <div className="relative">
          {props.images.length === 1 ? (
            <div className="relative overflow-hidden">
              <img
                src={props.images[0]}
                alt="Disaster report"
                className="w-full object-cover max-h-[400px] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-3 p-4 scrollbar-hide">
              {props.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={img}
                    alt={`Disaster report ${idx + 1}`}
                    className="w-64 h-64 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="px-6 py-5">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300">
          {props.title}
        </h3>
        <p className="text-gray-700 leading-relaxed text-base">
          {props.description}
        </p>
      </div>

      <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}
