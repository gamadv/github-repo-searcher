import { useState, useCallback, ChangeEvent } from 'react';
import RepositoryItem from './RepositoryItem';

import '../styles/repositoryList.scss';

type Repository = {
  name: string;
  description: string;
  html_url: string;
};

export function RepositoryList() {
  const [repositores, setRepositores] = useState<Repository[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('users');
  const [repoUser, setRepoUser] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [requestError, setRequestError] = useState('');

  const inputGroupPlaceHolder =
    selectedGroup === 'users' ? 'Digita o Usuário' : 'Digite a Organização';

  const buttonLabel = loadingData ? 'Carregando...' : 'Buscar';

  const handleGetSelectedGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    const group = event.target.value;

    setSelectedGroup(group);
  };

  const handleGetUser = (event: ChangeEvent<HTMLInputElement>) => {
    const user = event.target.value;

    setRepoUser(user);
  };

  const fetchRepositories = useCallback(async () => {
    setLoadingData(true);
    try {
      const response = await fetch(
        `https://api.github.com/${selectedGroup}/${repoUser}/repos`
      );

      const data = await response.json();

      if (data) {
        setRepositores(data);
        setLoadingData(false);

        return;
      }
      setRequestError('Não foi possível realizar busca, verifique os dados');
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      setRequestError('Não foi possível realizar busca, verifique os dados');
    }
  }, [selectedGroup, repoUser]);

  return (
    <section className="repository-list">
      <h1> GitHub Repo Searcher </h1>
      <h2> Onde pretende buscar o repo?</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder={inputGroupPlaceHolder}
          onChange={handleGetUser}
        />
        <select onChange={handleGetSelectedGroup}>
          <option value="users">Usuários</option>
          <option value="orgs">Organizações</option>
        </select>
        <button type="button" onClick={fetchRepositories} disabled={!repoUser}>
          {buttonLabel}
        </button>
      </div>
      {requestError ? <p>{requestError}</p> : null}
      <ul>
        {repositores.length
          ? repositores.map((repositorio) => (
              <RepositoryItem
                key={repositorio?.name}
                repository={repositorio}
              />
            ))
          : null}
      </ul>
    </section>
  );
}
