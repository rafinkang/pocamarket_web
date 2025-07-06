import { Tree, TreeItem, TreeProvider } from "@/components/ui/tree";
import { Folder, FileText } from "lucide-react";


export default function SourceTree(variant = "outline") {
  // 기본으로 열려있는 상태로 노출될 폴더 아이디
  const defaultExpandedIds = ['root', 'src', 'components', 'ui', 'button', 'tree'];
  return (
    <TreeProvider 
      className="w-full max-w-md" 
      variant={variant} 
      defaultExpandedIds={defaultExpandedIds}
    >
      <Tree>
        <TreeItem nodeId="root" label="Project" icon={<Folder />} hasChildren>
          <TreeItem nodeId="src" label="src" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="components" label="components" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="ui" label="ui" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="button" label="button.tsx" icon={<FileText />} level={4} />
                <TreeItem nodeId="tree" label="tree.tsx" icon={<FileText />} level={4} />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </Tree>
    </TreeProvider>
  )
}