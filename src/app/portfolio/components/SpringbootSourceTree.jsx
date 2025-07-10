import { Tree, TreeItem, TreeProvider } from "@/components/ui/tree";
import { Folder, FileText } from "lucide-react";

export default function SpringbootSourceTree() {
  // 기본으로 열려있는 상태로 노출될 폴더 아이디
  const defaultExpandedIds = ['root', 'pocamarket', 'service', 'infrastructure', 'user'];

  return (
    <TreeProvider
      className="w-full"
      variant="outline"
      defaultExpandedIds={defaultExpandedIds}
    >
      <Tree>
        <TreeItem nodeId="root" label="src/main/java/com" icon={<Folder />} hasChildren>
          <TreeItem nodeId="pocamarket" label="pocamarket" icon={<Folder />} level={1} hasChildren>

            {/* common 폴더 */}
            <TreeItem nodeId="common" label="common" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="common-aop" label="aop" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="trim" label="trim" icon={<Folder />} level={4} />
              </TreeItem>
              <TreeItem nodeId="common-dto" label="dto" icon={<Folder />} level={3} />
              <TreeItem nodeId="common-exception" label="exception" icon={<Folder />} level={3} />
              <TreeItem nodeId="common-util" label="util" icon={<Folder />} level={3} />
            </TreeItem>

            {/* infrastructure 폴더 */}
            <TreeItem nodeId="infrastructure" label="infrastructure" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="infra-config" label="config" icon={<Folder />} level={3} />
              <TreeItem nodeId="infra-script" label="script" icon={<Folder />} level={3} />
              <TreeItem nodeId="infra-security" label="security" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="oauth2" label="oauth2" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="oauth2-user" label="user" icon={<Folder />} level={5} />
                </TreeItem>
              </TreeItem>
              <TreeItem nodeId="infra-util" label="util" icon={<Folder />} level={3} />
            </TreeItem>

            {/* service 폴더 */}
            <TreeItem nodeId="service" label="service" icon={<Folder />} level={2} hasChildren>

              {/* pokemon 서비스 */}
              <TreeItem nodeId="pokemon" label="pokemon" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="pokemon-api" label="api" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="pokemon-controller" label="controller" icon={<Folder />} level={5} />
                  <TreeItem nodeId="pokemon-validator" label="validator" icon={<Folder />} level={5} />
                </TreeItem>
                <TreeItem nodeId="pokemon-application" label="application" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="pokemon-app-dto" label="dto" icon={<Folder />} level={5} hasChildren>
                    <TreeItem nodeId="pokemonability" label="pokemonability" icon={<Folder />} level={6} />
                    <TreeItem nodeId="pokemonattack" label="pokemonattack" icon={<Folder />} level={6} />
                    <TreeItem nodeId="pokemoncard" label="pokemoncard" icon={<Folder />} level={6} />
                  </TreeItem>
                  <TreeItem nodeId="pokemon-mapper" label="mapper" icon={<Folder />} level={5} />
                  <TreeItem nodeId="pokemon-app-service" label="service" icon={<Folder />} level={5} />
                </TreeItem>
                <TreeItem nodeId="pokemon-domain" label="domain" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="pokemon-entity" label="entity" icon={<Folder />} level={5} />
                  <TreeItem nodeId="pokemon-domain-exception" label="exception" icon={<Folder />} level={5} />
                  <TreeItem nodeId="pokemon-repository" label="repository" icon={<Folder />} level={5} />
                  <TreeItem nodeId="pokemon-value" label="value" icon={<Folder />} level={5} />
                </TreeItem>
              </TreeItem>

              {/* trade 서비스 */}
              <TreeItem nodeId="trade" label="trade" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="trade-api" label="api" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="trade-controller" label="controller" icon={<Folder />} level={5} />
                  <TreeItem nodeId="trade-validator" label="validator" icon={<Folder />} level={5} />
                </TreeItem>
                <TreeItem nodeId="trade-application" label="application" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="trade-dto" label="dto" icon={<Folder />} level={5} />
                  <TreeItem nodeId="trade-service" label="service" icon={<Folder />} level={5} />
                </TreeItem>
                <TreeItem nodeId="trade-domain" label="domain" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="trade-entity" label="entity" icon={<Folder />} level={5} />
                  <TreeItem nodeId="trade-enums" label="enums" icon={<Folder />} level={5} />
                  <TreeItem nodeId="trade-exception" label="exception" icon={<Folder />} level={5} />
                  <TreeItem nodeId="trade-repository" label="repository" icon={<Folder />} level={5} />
                  <TreeItem nodeId="trade-value" label="value" icon={<Folder />} level={5} />
                </TreeItem>
              </TreeItem>

              {/* user 서비스 */}
              <TreeItem nodeId="user" label="user" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="user-api" label="api" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="user-controller" label="controller" icon={<Folder />} level={5} />
                </TreeItem>
                <TreeItem nodeId="user-application" label="application" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="user-dto" label="dto" icon={<Folder />} level={5} />
                  <TreeItem nodeId="user-service" label="service" icon={<Folder />} level={5} />
                </TreeItem>
                <TreeItem nodeId="user-domain" label="domain" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="user-entity" label="entity" icon={<Folder />} level={5} />
                  <TreeItem nodeId="user-enums" label="enums" icon={<Folder />} level={5} />
                  <TreeItem nodeId="user-exception" label="exception" icon={<Folder />} level={5} />
                  <TreeItem nodeId="user-repository" label="repository" icon={<Folder />} level={5} />
                  <TreeItem nodeId="user-value" label="value" icon={<Folder />} level={5} />
                </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>

      </Tree>
    </TreeProvider >
  )
}