type RepositoryItemProps = {
  repository: {
    name: string;
    description: string;
    html_url: string;
  };
};

export default function RepositoryItem(props: RepositoryItemProps) {
  const {
    repository: { name, description, html_url },
  } = props;

  return (
    <li className="repository-container">
      <strong> {name} </strong>
      <p>{description}</p>

      <a href={html_url} rel="noopener noreferrer" target="_blank">
        Acessar Repositorio
      </a>
    </li>
  );
}
