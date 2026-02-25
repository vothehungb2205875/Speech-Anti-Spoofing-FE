export function TimelineSection() {
  const milestones = [
    { month: "12/2025", title: "Ideation", description: "Conceptualizing the project vision", isActive: false },
    { month: "1/2026", title: "Research Studies", description: "Reviewing existing research and frameworks", isActive: false },
    { month: "2/2026", title: "Architecture Research", description: "Designing system architecture", isActive: false },
    { month: "3/2026", title: "Model Training", description: "Training AI and ML models", isActive: false },
    { month: "4/2026", title: "Service Deployment", description: "Rolling out services to production", isActive: false },
    { month: "5/2026", title: "Service Testing", description: "Testing and optimization (Current)", isActive: true },
  ];

  return (
    <section id="timeline" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-4 text-center">Development Roadmap</h3>
        <p className="text-center text-gray-600 mb-12">Project milestones from ideation to service testing</p>

        {/* Timeline Container */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-200" style={{ transformOrigin: "left" }}></div>

          {/* Timeline Items */}
          <div className="flex justify-between gap-4 relative z-10">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Timeline Node */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                    milestone.isActive
                      ? "bg-cyan-500 shadow-lg shadow-cyan-500/50 scale-110"
                      : "bg-white border-4 border-blue-300 hover:border-cyan-400"
                  }`}
                >
                  <div className={`text-center font-bold text-sm ${milestone.isActive ? "text-white" : "text-blue-500"}`}>
                    {milestone.month.split("/")[0]}
                    <div className="text-xs">
                      {milestone.month.split("/")[1]}
                    </div>
                  </div>
                </div>

                {/* Milestone Info */}
                <div className="text-center">
                  <h4 className={`font-bold text-sm mb-1 ${milestone.isActive ? "text-cyan-600" : "text-gray-700"}`}>
                    {milestone.title}
                  </h4>
                  <p className={`text-xs ${milestone.isActive ? "text-cyan-500" : "text-gray-500"}`}>
                    {milestone.description}
                  </p>
                  {milestone.isActive && (
                    <span className="inline-block mt-2 px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full">
                      Current
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
