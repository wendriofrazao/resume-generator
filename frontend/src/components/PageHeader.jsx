import resumeIcon from '../assets/img/curriculoIcon.svg'


export function PageHeader() {

return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-40 px-0 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          {/* Page Header */}
          <div className="flex items-center space-x-5">
            <div className="w-8 h-8"> <img src={resumeIcon}/> </div>
            <span className="text-2xl font-semibold">
              Meus Currículos
            </span>
          </div>
        </div>
        </div>
    </div>
)
}