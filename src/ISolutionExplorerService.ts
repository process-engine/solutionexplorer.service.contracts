import {IIdentity} from '@essential-projects/core_contracts';
import {IDiagram, ISolution} from '@process-engine/solutionexplorer.contracts';

export interface ISolutionExplorerService {

  /**
   * Prepares the solution explorer service to load a given path specification.
   *
   * @param pathspec The path specification to load.
   * @param identity The identity that is used to authorize, currently unused.
   */
  // TODO: Bitte die identity nach vorne als ersten Parameter setzen.
  openSolution(pathspec: string, identity: IIdentity): Promise<void>;

  /**
   * Loads the solution, its required to call openSolution() first.
   *
   * @returns A promise, resolving to the loaded solution.
   */
  loadSolution(): Promise<ISolution>;

  /**
   * Loads a single diagram from the current solution.
   *
   * @param diagramName The name of the diagram to load.
   * @returns A promise, resolving to the loaded diagram.
   */
  loadDiagram(diagramName: string): Promise<IDiagram>;

  /**
   * Loads a single diagram outside of the current solution.
   *
   * @param pathToDiagram The full path to the file.
   * @returns A promise, resolving to the loaded diagram.
   * @throws {ForbiddenError} When the authority couldn't authorize the request
   * with given credentials.
   * @throws {UnauthorizedError} When there where no valid authentication
   * credentials given.
   */
  openSingleDiagram(pathToDiagram: string, identity: IIdentity): Promise<IDiagram>;

  /**
   * Saves a single diagram outside the context of a solution.
   * @param diagramToSave The diagram to save.
   * @param identity The identity that is used to authorize, currently unused.
   * @param path The path to save the diagram, if not set it defaults to the uri
   * set in the diagram itself.
   * @returns The saved diagram.
   * @throws {ForbiddenError} When the authority couldn't authorize the request
   * with given credentials.
   * @throws {UnauthorizedError} When there where no valid authentication
   * credentials given.
   */
  saveSingleDiagram(diagramToSave: IDiagram, identity: IIdentity, path?: string): Promise<IDiagram>;
  /**
   * Saves the given solution and all its diagrams. If a solution already
   * exists, it will be overriden. This method does not modify the currently
   * loaded pathspec.
   *
   * @param solution The solution to save.
   * @param pathspec The target path for the save operation, defaults to the source
   *                 of the solution if omitted.
   */
  saveSolution(solution: ISolution, pathspec?: string): Promise<void>;

  /**
   * Save a single diagram, if a diagram already exists, it will be overriden.
   *
   * @param diagram The diagram to save.
   * @param pathspec The target path for the save operation, defaults to the source
   *                 of the diagram if omitted.
   */
  saveDiagram(diagram: IDiagram, pathspec?: string): Promise<void>;

  /**
   * Deletes the diagram from the solution.
   *
   * @param diagram The diagram to delete.
   * @returns A promise, resolving once the diagram has been deleted.
   * @throws {ForbiddenError} When required claims are missing.
   */
  deleteDiagram(diagram: IDiagram): Promise<void>;

  /**
   * Renames the diagram to the given name.
   *
   * @param diagram The diagram to rename.
   * @param newName The new name of the diagram.
   * @returns A promise, resolving with the renamed diagram.
   * @throws {ForbiddenError} When required claims are missing.
   */
  renameDiagram(diagram: IDiagram, newName: string): Promise<IDiagram>;
}
