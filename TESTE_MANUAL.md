# Guia de Verificação Manual - Portfólio 3D

## Como Testar

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   cd C:\Users\User\projetos-3d
   npm run dev
   ```

2. **Abra o navegador** em http://localhost:5173

3. **Teste cada seção** seguindo este guia:

---

## 1. Hero (Topo da Página)

### O que verificar:
- [ ] Fonte "Inter" aplicada nos nomes "KAIQUE" e "CALEFI"
- [ ] Espaçamento maior entre os nomes (gap maior)
- [ ] Card do Liquid Metal maior e centralizado
- [ ] Botões funcionando (hover com efeito)
- [ ] Badge "Disponível para novos projetos" visível

### Problemas comuns:
- Se a fonte não aparece, verifique se a Inter está sendo carregada
- Se o gap não mudou, verifique se as alterações no CSS foram aplicadas

---

## 2. Seção Habilidades

### O que verificar:
- [ ] Grid responsivo com cards
- [ ] Cards aparecem com animação ao rolar
- [ ] Hover nos cards com elevação e sombra
- [ ] Tags visíveis em cada card
- [ ] Texto "O que eu faço de melhor?" visível

### Problemas comuns:
- Se os cards não aparecem, verifique se o GSAP está funcionando
- Se o grid não está responsivo, verifique o CSS

---

## 3. Navegação Inferior

### O que verificar:
- [ ] Ícone da casa (SVG) visível no primeiro item
- [ ] Hover funciona em todos os itens
- [ ] Scroll suave ao clicar nos links
- [ ] Item ativo destacado corretamente
- [ ] Fundo glass morphism visível

### Problemas comuns:
- Se o ícone não aparece, verifique o SVG no código
- Se o scroll não funciona, verifique se os IDs das seções estão corretos

---

## 4. Animações Hover

### O que verificar:
- [ ] Botões primários: hover com mudança de cor
- [ ] Botões outline: hover com borda destacada
- [ ] Cards de habilidade: elevação ao hover
- [ ] FAQ: mudança de cor ao hover
- [ ] Transições suaves (0.2-0.3s)

---

## 5. Responsividade

### O que verificar:
- [ ] **Mobile (320-480px)**: Layout em coluna única
- [ ] **Tablet (481-768px)**: Grid de 2 colunas
- [ ] **Desktop (769-1200px)**: Grid completo
- [ ] **Large (1200+)**: Max-width respeitado

---

## 6. Fundo do Site

### O que verificar:
- [ ] Textura sutil visível (noise SVG)
- [ ] Não há padrões irritantes
- [ ] Contraste adequado com o texto

---

## 7. Scroll

### O que verificar:
- [ ] Scroll suave entre seções
- [ ] Animações ativam no momento certo
- [ ] Não há saltos ou travamentos

---

## Problemas Comuns e Soluções

### **Problema**: Fonte não carrega
**Solução**: Verifique se a URL da fonte no CSS está correta e se há conexão com a internet

### **Problema**: Animações não funcionam
**Solução**: Verifique se o GSAP está importado e registrado corretamente

### **Problema**: Layout quebrado no mobile
**Solução**: Verifique se os media queries estão aplicados corretamente

### **Problema**: Scroll não funciona
**Solução**: Verifique se os IDs das seções estão corretos e se o scroll-behavior: smooth está ativo

---

## Checklist Final

- [ ] Hero com fonte Inter e espaçamento maior
- [ ] Seção Habilidades com grid responsivo
- [ ] Navegação com ícone de casa funcionando
- [ ] Animações hover em todos os elementos
- [ ] Fundo com textura sutil
- [ ] Scroll suave
- [ ] Responsivo em todas as telas
- [ ] Sem erros no console do navegador

---

## Como Reportar Problemas

Se encontrar algum problema, documente:
1. **O que aconteceu** (comportamento esperado vs atual)
2. **Passos para reproduzir** (o que você fez antes do problema)
3. **Screenshot** (se possível)
4. **Navegador e versão** (Chrome, Firefox, Safari, etc.)
5. **Tamanho da tela** (largura em pixels)

Isso ajudará a identificar e corrigir o problema rapidamente.