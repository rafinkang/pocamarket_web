import { Tree, TreeItem, TreeProvider } from "@/components/ui/tree";
import { Folder, FileText } from "lucide-react";

/**
 * Next.js 프로젝트의 실제 소스 코드 구조를 보여주는 트리 컴포넌트
 * @param {string} variant - 트리 스타일 변형 
 * @returns {JSX.Element} Next.js 소스 트리 컴포넌트
 */
export default function NextjsSourceTree(variant = "outline") {
  // 기본으로 열려있는 상태로 노출될 폴더 아이디
  const defaultExpandedIds = ['src', 'app','next-api', 'proxy'];
  
  return (
    <TreeProvider 
      className="w-full" 
      variant="outline" 
      defaultExpandedIds={defaultExpandedIds}
    >
      <Tree>
        <TreeItem nodeId="src" label="src" icon={<Folder />} hasChildren>
          <TreeItem nodeId="api" label="api" icon={<Folder />} level={1} />
          
          <TreeItem nodeId="app" label="app" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="about-us" label="about-us" icon={<Folder />} level={2} />
            
            <TreeItem nodeId="login" label="login" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="login-components" label="components" icon={<Folder />} level={3} />
              <TreeItem nodeId="login-success" label="success" icon={<Folder />} level={3} />
            </TreeItem>
            
            <TreeItem nodeId="mypage" label="mypage" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="mypage-components" label="components" icon={<Folder />} level={3} />
            </TreeItem>
            
            <TreeItem nodeId="next-api" label="next-api" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="auth" label="auth" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="auth-me" label="me" icon={<Folder />} level={4} />
              </TreeItem>
              <TreeItem nodeId="proxy" label="proxy" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="proxy-slug" label="[...slug]" icon={<Folder />} level={4} />
              </TreeItem>
            </TreeItem>
            
            <TreeItem nodeId="pokemon-card" label="pokemon-card" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="pokemon-card-components" label="components" icon={<Folder />} level={3} />
              <TreeItem nodeId="pokemon-card-code" label="[code]" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="pokemon-card-code-components" label="components" icon={<Folder />} level={4} />
              </TreeItem>
            </TreeItem>
            
            <TreeItem nodeId="pokemon-card-trade" label="pokemon-card-trade" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="trade-components" label="components" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="trade-search" label="Search" icon={<Folder />} level={4} />
              </TreeItem>
              <TreeItem nodeId="trade-write" label="write" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="trade-write-components" label="components" icon={<Folder />} level={4} />
                <TreeItem nodeId="trade-write-id" label="[tradeId]" icon={<Folder />} level={4} />
              </TreeItem>
              <TreeItem nodeId="trade-id" label="[tradeId]" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="trade-id-components" label="components" icon={<Folder />} level={4} />
              </TreeItem>
            </TreeItem>
            
            <TreeItem nodeId="portfolio" label="portfolio" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="portfolio-components" label="components" icon={<Folder />} level={3} />
            </TreeItem>
            
            <TreeItem nodeId="signup" label="signup" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="signup-components" label="components" icon={<Folder />} level={3} />
            </TreeItem>
          </TreeItem>
          
          <TreeItem nodeId="assets" label="assets" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="fonts" label="fonts" icon={<Folder />} level={2} />
            <TreeItem nodeId="icons" label="icons" icon={<Folder />} level={2} />
            <TreeItem nodeId="images" label="images" icon={<Folder />} level={2} />
          </TreeItem>
          
          <TreeItem nodeId="components" label="components" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="card" label="card" icon={<Folder />} level={2} />
            <TreeItem nodeId="cardImage" label="cardImage" icon={<Folder />} level={2} />
            <TreeItem nodeId="cardList" label="cardList" icon={<Folder />} level={2} />
            <TreeItem nodeId="cardListContainer" label="cardListContainer" icon={<Folder />} level={2} />
            <TreeItem nodeId="cardSearchFilter" label="cardSearchFilter" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="button" label="button" icon={<Folder />} level={3} />
              <TreeItem nodeId="filterArea" label="filterArea" icon={<Folder />} level={3} />
              <TreeItem nodeId="option" label="option" icon={<Folder />} level={3} />
              <TreeItem nodeId="text" label="text" icon={<Folder />} level={3} />
            </TreeItem>
            <TreeItem nodeId="carousel" label="carousel" icon={<Folder />} level={2} />
            <TreeItem nodeId="dialog" label="dialog" icon={<Folder />} level={2} />
            <TreeItem nodeId="home" label="home" icon={<Folder />} level={2} />
            <TreeItem nodeId="icon" label="icon" icon={<Folder />} level={2} />
            <TreeItem nodeId="input" label="input" icon={<Folder />} level={2} />
            <TreeItem nodeId="layout" label="layout" icon={<Folder />} level={2} />
            <TreeItem nodeId="pagination" label="pagination" icon={<Folder />} level={2} />
            <TreeItem nodeId="pokemon" label="pokemon" icon={<Folder />} level={2} />
            <TreeItem nodeId="providers" label="providers" icon={<Folder />} level={2} />
            <TreeItem nodeId="ui" label="ui" icon={<Folder />} level={2} />
          </TreeItem>
          
          <TreeItem nodeId="config" label="config" icon={<Folder />} level={1} />
          <TreeItem nodeId="constants" label="constants" icon={<Folder />} level={1} />
          <TreeItem nodeId="hooks" label="hooks" icon={<Folder />} level={1} />
          
          <TreeItem nodeId="lib" label="lib" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="actions" label="actions" icon={<Folder />} level={2} />
          </TreeItem>
          
          <TreeItem nodeId="store" label="store" icon={<Folder />} level={1} />
          
          <TreeItem nodeId="stories" label="stories" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="stories-assets" label="assets" icon={<Folder />} level={2} />
            <TreeItem nodeId="stories-sample" label="sample" icon={<Folder />} level={2} />
          </TreeItem>
          
          <TreeItem nodeId="styles" label="styles" icon={<Folder />} level={1} />
          <TreeItem nodeId="utils" label="utils" icon={<Folder />} level={1} />
        </TreeItem>
      </Tree>
    </TreeProvider>
  )
}