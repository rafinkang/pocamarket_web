import { Tree, TreeItem, TreeProvider } from "@/components/ui/tree";
import { Folder, FileText } from "lucide-react";


export default function SourceTree(variant = "outline") {
  // 기본으로 열려있는 상태로 노출될 폴더 아이디
  const defaultExpandedIds = ['root', '.github', 'nginx', 'workflows'];
  return (
    <TreeProvider 
      className="w-full" 
      variant="outline" 
      defaultExpandedIds={defaultExpandedIds}
    >
      <Tree>
        <TreeItem nodeId="root" label="pocamarket" icon={<Folder />} hasChildren>
          <TreeItem nodeId=".github" label=".github" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="workflows" label="workflows" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="docker-deploy.yml" label="docker-deploy.yml" icon={<FileText />} level={3} />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="certbot" label="certbot" icon={<Folder />} level={1} hasChildren></TreeItem>
          <TreeItem nodeId="nginx" label="nginx" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="nginx.conf" label="nginx.conf" icon={<FileText />} level={2} />
            <TreeItem nodeId="nginx.dev.conf" label="nginx.dev.conf" icon={<FileText />} level={2} />
            <TreeItem nodeId="nginx.stage.conf" label="nginx.stage.conf" icon={<FileText />} level={2} />
          </TreeItem>
          <TreeItem nodeId="pocamarket-api" label="pocamarket-api <- Spring Boot Container" icon={<Folder />} level={1} hasChildren></TreeItem>
          <TreeItem nodeId="pocamarket-web" label="pocamarket-web <- Next.js Container" icon={<Folder />} level={1} hasChildren></TreeItem>
          <TreeItem nodeId="docker-compose" label="docker-compose.yml" icon={<FileText />} level={1} />
          <TreeItem nodeId="docker-compose.dev" label="docker-compose.dev.yml" icon={<FileText />} level={1} />
          <TreeItem nodeId="docker-compose.stage" label="docker-compose.stage.yml" icon={<FileText />} level={1} />
        </TreeItem>
      </Tree>
    </TreeProvider>
  )
}