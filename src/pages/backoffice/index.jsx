import CardMenu from "@/web/components/CardMenu"

const BackofficePage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-8">Bienvenue dans le backoffice !</h1>
    <p className="text-lg mb-4">Gérer les suggestions et pages clients</p>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardMenu
        title="Liste des suggestions"
        description="Visualiser et supprimer des suggestions"
        link="/backoffice/suggestions"
      />
      <CardMenu
        title="Créer des pages client"
        description="Créer des pages personnalisées pour différents clients."
        link="/backoffice/create-client-pages"
      />
      <CardMenu
        title="Pages client personnalisées"
        description="Visualiser et gérer des pages personnalisées pour différents clients."
        link="/backoffice/client-pages"
      />
    </div>
  </div>
)

export default BackofficePage
